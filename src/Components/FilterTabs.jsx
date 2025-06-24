export default function FilterTabs({ currentFilter, onChangeFilter }) {
  return (
    <div className="filter-tabs">
      <button 
        className={currentFilter === 'all' ? 'active' : ''}
        onClick={() => onChangeFilter('all')}
      >
        All
      </button>
      <button
        className={currentFilter === 'open' ? 'active' : ''}
        onClick={() => onChangeFilter('open')}
      >
        Open
      </button>
      <button
        className={currentFilter === 'closed' ? 'active' : ''}
        onClick={() => onChangeFilter('closed')}
      >
        Closed
      </button>
    </div>
  )
}