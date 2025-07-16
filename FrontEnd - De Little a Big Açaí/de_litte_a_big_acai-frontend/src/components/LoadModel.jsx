function LoadModel() {
  return (
    <>
      <div style={{cursor: 'wait'}} className="modal fade" id="loadModal" tabIndex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div className="modal-dialog modal-dialog-centered d-flex justify-content-center">
          <div className="spinner-border text-info" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </>
  )
}
  export default LoadModel