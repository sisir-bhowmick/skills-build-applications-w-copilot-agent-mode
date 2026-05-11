import React, { useEffect, useMemo, useState } from 'react';

const endpointName = 'activities';

const getApiUrl = () => {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/${endpointName}/`
    : `http://localhost:8000/api/${endpointName}/`;
  console.log('[Activities] REST API endpoint:', baseUrl);
  return baseUrl;
};

function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = () => {
    const url = getApiUrl();
    console.log('[Activities] Fetching data from', url);
    setLoading(true);
    setError(null);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Fetch failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('[Activities] fetched data:', data);
        const result = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
          ? data.results
          : data;
        setItems(Array.isArray(result) ? result : [result]);
      })
      .catch((fetchError) => {
        console.error('[Activities] fetch error:', fetchError);
        setError(fetchError.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    const lower = searchQuery.toLowerCase();
    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(lower));
  }, [items, searchQuery]);

  const columns = useMemo(() => {
    const keys = new Set();
    items.forEach((item) => Object.keys(item).forEach((key) => keys.add(key)));
    return Array.from(keys);
  }, [items]);

  return (
    <div className="card card-custom">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3">Activities</h1>
            <p className="text-muted mb-0">Browse activity records from the backend API.</p>
          </div>
          <button className="btn btn-outline-primary" type="button" onClick={fetchData}>
            Refresh
          </button>
        </div>

        <form className="row g-3 align-items-end mb-4" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-8">
            <label htmlFor="activitiesSearch" className="form-label">
              Search activities
            </label>
            <input
              id="activitiesSearch"
              type="search"
              className="form-control"
              placeholder="Search all fields"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
          <div className="col-md-4 d-flex align-items-end justify-content-end">
            <button className="btn btn-primary w-100" type="button" onClick={() => setSearchQuery('')}>
              Clear search
            </button>
          </div>
        </form>

        {loading && <div className="alert alert-info">Loading activities...</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && filteredItems.length === 0 && (
          <div className="alert alert-warning">No matching activities found.</div>
        )}

        <div className="table-responsive table-container">
          <table className="table table-striped table-hover table-bordered align-middle mb-0">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={item.id ?? index}>
                  {columns.map((column) => {
                    const value = item[column];
                    const cell =
                      value === null || value === undefined
                        ? '-'
                        : typeof value === 'object'
                        ? JSON.stringify(value)
                        : String(value);
                    return <td key={`${column}-${index}`}>{cell}</td>;
                  })}
                  <td>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                      onClick={() => {
                        setSelectedItem(item);
                        setShowModal(true);
                      }}
                    >
                      View details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && selectedItem && (
          <>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
              <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Activity details</h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => setShowModal(false)}
                    />
                  </div>
                  <div className="modal-body">
                    <pre className="bg-light p-3 rounded">{JSON.stringify(selectedItem, null, 2)}</pre>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" type="button" onClick={() => setShowModal(false)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show" />
          </>
        )}
      </div>
    </div>
  );
}

export default Activities;
