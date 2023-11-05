import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'
import * as AiIcons from 'react-icons/ai'

export const SidebarMenus = [
    {
        icon: <MdIcons.MdDashboard />,
        title: 'Dashboard',
        path: '/dashboard'
    },

    {
        icon: <FaIcons.FaUserAlt />,
        title: 'Clients',
        path: '/clients'
    },
    {
        icon: <FaIcons.FaFileInvoice />,
        title: 'Invoices',
        path: '/invoices'
    },

    {
        icon: <FaIcons.FaFileInvoiceDollar />,
        title: 'Expenses',
        path: '/expenses'
    },
    {
        icon: <AiIcons.AiOutlineSetting />,
        title: 'Settings',
        path: '/settings'
    }

];