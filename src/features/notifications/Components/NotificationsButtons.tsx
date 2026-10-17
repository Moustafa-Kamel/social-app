
export default function NotificationsButtons({onFilterChange,filter}:{onFilterChange?: (filter: 'all' | 'unread') => void,filter:string}) {
  return (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:items-center">
          <button
            type="button"
            onClick={() => onFilterChange?.('all')}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition cursor-pointer ${
              filter === 'all' 
                ? 'bg-main-color text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          
          <button
            type="button"
            onClick={() => onFilterChange?.('unread')}
            className={`inline-flex items-center cursor-pointer justify-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold transition ${
              filter === 'unread' 
                ? 'bg-main-color text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Unread
          </button>
        </div>
  )
}
