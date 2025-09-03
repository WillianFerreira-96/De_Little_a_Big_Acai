import { useEffect, useState } from "react"

function LoadModal() {
  const [waintingMessage, setWaintingMessage] = useState('')
  const [count, setCount] = useState(30);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }else if(count == 0){
      const timer = setTimeout(() => setCount(count + 30), 1000);
    }
  }, [count])

  useEffect(() => {
    setTimeout(() => {
      setWaintingMessage(`Requisitando dados ao Fly.io... ${count}s`)
    }, 5000);
  })

  return (
    <>
      <div style={{ cursor: 'wait' }} className="modal fade" id="loadModal" tabIndex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div className="modal-dialog modal-dialog-centered d-flex justify-content-center flex-column">
          <div className="modal-dialog-centered d-flex justify-content-center">
            <div className="spinner-border text-info" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="text-info fw-bold ms-3">Loading...</span>
          </div>
          <div className="pt-5">
            <span className="text-wrap text-white fw-bold text-center">{waintingMessage}</span>
          </div>
        </div>
      </div>
    </>
  )
}
export default LoadModal