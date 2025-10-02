import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Phone, Globe } from 'lucide-react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
}

function UserList() {
  const [listOfUser, setListOfUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setListOfUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">User Directory</h1>
          <p className="text-slate-600">Browse through our community members</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listOfUser.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300 transform hover:-translate-y-1"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-24 relative">
                <div className="absolute -bottom-10 left-6">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <User className="w-10 h-10 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="pt-14 px-6 pb-6">
                <h2 className="text-xl font-bold text-slate-800 mb-1">{user.name}</h2>
                <p className="text-sm text-slate-500 mb-4">@{user.username}</p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <Mail className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 break-all">{user.email}</span>
                  </div>

                  <div className="flex items-start gap-3 text-sm">
                    <Phone className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{user.phone}</span>
                  </div>

                  <div className="flex items-start gap-3 text-sm">
                    <Globe className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{user.website}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="text-xs text-slate-600">
                    <p className="font-semibold mb-1">{user.company.name}</p>
                    <p className="text-slate-500">
                      {user.address.city}, {user.address.zipcode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserList;
