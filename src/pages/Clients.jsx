import { useEffect, useState } from "react";
import API_URL from "../Api/server";
import useAuth from "../hooks/useAuth";
function Clients() {
  const [clients, setClients] = useState({});
  const [isLoading, setIsLoading] = useState(true);
const { user } = useAuth();
  useEffect(() => {
    const getClients = async () => {
      try {
        const response = await fetch(`${API_URL}clients`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
       if(!response.ok) throw new Error('Error fetching clients');
        const data = await response.json();
        setClients(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching clients:", error);
        setIsLoading(false);
      }
      finally{
        setIsLoading(false);
      }
    };

   setTimeout(() => {
     getClients();
   }, 1000);
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Clients</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : clients.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr>
                <th className="border-b border-gray-200 py-4">Client Name</th>
                <th className="border-b border-gray-200 py-4">Email</th>
                <th className="border-b border-gray-200 py-4">Telephone</th>
                <th className="border-b border-gray-200 py-4">Address</th>
                <th className="border-b border-gray-200 py-4">Country</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(clients) ? (
                clients.map((client) => (
                  <tr key={client._id}>
                    <td className="border-b border-gray-200 py-4">{client.name}</td>
                    {console.log("Im here",client.company)}
                    <td className="border-b border-gray-200 py-4">{client.email}</td>
                    <td className="border-b border-gray-200 py-4">{client.tel}</td>
                    <td className="border-b border-gray-200 py-4">{client.address}</td>
                    <td className="border-b border-gray-200 py-4">{client.country}</td>
                  </tr>
                ))
              ) : (
                <p>No clients found.</p>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No clients found.</p>
      )}
    </div>
  );
}

export default Clients;
