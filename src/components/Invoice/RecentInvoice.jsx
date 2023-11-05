/* eslint-disable react/prop-types */

const header = [
  "Client",
  "Date",
  "Location",
  "Status",
  "Price",
  "Action"];
// eslint-disable-next-line no-unused-vars
const RecentInvoice = ({invoices}) => {
  return (
   <div>
    <h2>Recent Invoices</h2>
    <div className="relative overflow-x-auto shadow-md">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            {header.map((item, index) => (
              <th key={index} scope="col" className="px-6 py-3 font-medium tracking-wider">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={invoice._id} className={index % 2 === 0 ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700" : "border-b bg-gray-50"}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap d">
                {invoice.client.company}
              </th>
              <td className="px-6 py-4">{invoice.date}</td>
              <td className="px-6 py-4">{invoice.items.location}</td>
              <td className="px-6 py-4">{invoice.status}</td>
              <td className="px-6 py-4">{invoice.totalAmount}</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   </div>
  );
};

export default RecentInvoice;
