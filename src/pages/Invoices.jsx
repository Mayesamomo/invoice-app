/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState, Suspense} from "react";

import useApp from '../hooks/useApp';
import useAuth from '../hooks/useAuth';
import API_URL from '../Api/server';


function Invoices() {
  const { invoices, dispatch } = useApp();
  const { user } = useAuth();
  const [isFetching, setIsFetching] = useState(true);
const[error,setError]=useState(false);

  useEffect(() => {
    const getInvoices = async () => {
      try {
        const response = await fetch(`${API_URL}invoices`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })

        const data = await response.json();
        console.log('data is here: ', data);

        if (response.ok) {
         await  dispatch({ state: "invoices", type: 'GET_INVOICES', payload: data });

          console.log('data is here: ', data);
          console.log('invoices is here: ', invoices);
          setIsFetching(false); 
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
        setIsFetching(false);
        setError(error.message);
      }
    };

    if (user.token) {
      getInvoices();
      setIsFetching(false);
    }
  }, [dispatch, user.token]);

  return (
    <Suspense fallback={<p>Fetching invoices...</p>}>
      <h2>All Invoices</h2>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left text-gray-500">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                  Invoice Number
                </th>
                <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                  Client
                </th>
                <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                  Total Amount
                </th>
                <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(invoices) ? (
                invoices.map((invoice) => (
                  <tr key={invoice._id} className="border-b">
                    <td className="px-6 py-4">{invoice.invoiceNumber}</td>
                    <td className="px-6 py-4">{invoice.client.company}</td>
                    <td className="px-6 py-4">{invoice.date}</td>
                    <td className="px-6 py-4">{invoice.status}</td>
                    <td className="px-6 py-4">{invoice.totalAmount}</td>
                    <td className="px-6 py-4">
                      <a href="#" className="font-medium text-blue-600 hover:underline">
                        Edit
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No invoices found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Suspense>
  );
}

export default Invoices;
