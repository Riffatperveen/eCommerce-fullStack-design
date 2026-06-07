import { useState, useEffect } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct, loginUser } from '../services/api';

function AdminPanelPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Login form state
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('123456');

  // Edit/Add modal state
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', price: '', category: '', description: '', stock: '', image: ''
  });

  useEffect(() => {
    checkAdmin();
    if (isAdmin) {
      loadProducts();
    }
  }, [isAdmin]);

  const checkAdmin = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      if (parsed.isAdmin) {
        setIsAdmin(true);
      }
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts('');
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('userInfo', JSON.stringify(data));
      if (data.isAdmin) {
        setIsAdmin(true);
      } else {
        alert('Not authorized as an admin');
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setIsAdmin(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p._id !== id));
      } catch (error) {
        alert('Failed to delete product');
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct && editingProduct._id) {
        // Edit
        const data = await updateProduct(editingProduct._id, formData);
        setProducts(products.map(p => p._id === data._id ? data : p));
      } else {
        // Add
        const data = await createProduct(formData);
        setProducts([...products, data]);
      }
      setEditingProduct(null); // close modal
    } catch (error) {
      alert('Failed to save product');
    }
  };

  const openAddModal = () => {
    setFormData({ name: '', price: '', category: '', description: '', stock: '', image: '' });
    setEditingProduct({});
  };

  const openEditModal = (product) => {
    setFormData(product);
    setEditingProduct(product);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input className="w-full border p-2 rounded" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-6">
            <label className="block text-sm mb-1">Password</label>
            <input className="w-full border p-2 rounded" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel - Products</h1>
          <div>
            <button onClick={openAddModal} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-4">
              + Add Product
            </button>
            <button onClick={handleLogout} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map(product => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => openEditModal(product)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                      <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit/Add Modal */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-lg">
              <h2 className="text-2xl font-bold mb-4">{editingProduct._id ? 'Edit Product' : 'Add Product'}</h2>
              <form onSubmit={handleSave}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm">Name</label>
                    <input className="w-full border p-2 rounded" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm">Price</label>
                      <input className="w-full border p-2 rounded" type="number" step="0.01" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm">Stock</label>
                      <input className="w-full border p-2 rounded" type="number" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm">Category</label>
                    <input className="w-full border p-2 rounded" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm">Image URL</label>
                    <input className="w-full border p-2 rounded" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm">Description</label>
                    <textarea className="w-full border p-2 rounded" rows="3" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                  <button type="button" onClick={() => setEditingProduct(null)} className="px-4 py-2 text-gray-800 hover:text-gray-900">Cancel</button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanelPage;
