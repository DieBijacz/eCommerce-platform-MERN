import React from 'react'

const FourIcon = () => {
  return (
    <div className='d-flex justify-content-between my-3'>

      <div className='four-icons d-flex justify-content-center align-items-center'>
        <i class="fa-brands fa-paypal"></i>
        <div>
          <p>PayPal</p>
          <span>Free when you spent 100</span>
        </div>
      </div>

      <div className='four-icons d-flex justify-content-center align-items-center'>
        <i class="fa-solid fa-house-chimney"></i>
        <div>
          <p>Free Shipping</p>
          <span>Free when you spent 100</span>
        </div>
      </div>

      <div className='four-icons d-flex justify-content-center align-items-center'>
        <i class="fa-solid fa-paper-plane"></i>
        <div>
          <p>Fast Delivery</p>
          <span>Free when you spent 100</span>
        </div>
      </div>

      <div className='four-icons d-flex justify-content-center align-items-center'>
        <i class="fa-solid fa-user-shield"></i>
        <div>
          <p>Secure</p>
          <span>Free when you spent 100</span>
        </div>
      </div>
    </div>
  )
}

export default FourIcon