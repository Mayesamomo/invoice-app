/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect,useState, Suspense } from "react"
import useApp from '../hooks/useApp'
import useAuth from '../hooks/useAuth'
import RecentInvoice from "../components/Invoice/RecentInvoice"
import API_URL from '../Api/server'

function Dashboard() {
  const { recentInvoices, dispatch } = useApp()
  const { user } = useAuth()
  const [isFetching, setisFetching] = useState(true);
  useEffect(() => {
    const getRecentInvoices = async () => {
      try {
        const response = await fetch(`${API_URL}invoices/recent`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          dispatch({ state: "recentInvoices", type: 'RECENT_INVOICES', payload: data });
        }
      } catch (error) {
        console.error("Error fetching recent invoices:", error);
      } finally {
        setisFetching(false);
      }
    };

    if (user) {
      getRecentInvoices();
      setisFetching(true);
    }
  }, [dispatch, user]);
  return (
    <Suspense>
      <div className="recent w-full mt-4 mx-2">
        {isFetching ? (
          <p className="text-center text-2xl">Loading recent invoices...</p>
        ) : recentInvoices && recentInvoices.length > 0 ? (
          recentInvoices.map((invoice) => (
            <RecentInvoice key={invoice._id} invoices={invoice} />
          ))
        ) : (
          <p className="text-center text-2xl">No recent invoices</p>
        )}
      </div>
    </Suspense>
  )
}

export default Dashboard;
