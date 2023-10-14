import React from "react";

const SummaryWindow = ({
  id,
  paymentMethod,
  cashierName,
  customerName,
  quantity,
  discount,
  totalPrice,
  paymentDetails,
  placeOrder,
  rewardsPoints,
}) => {
  const calculateChanges = () => {
    return parseInt(paymentDetails - (totalPrice - discount));
  };

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      role="ModalBase"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Confirm
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="row modal-body">
            <h5>Bill Summary</h5>
            <div className="col mt-2">
              <div className="row">
                <dt className="col-5 ">Cashier Name:</dt>
                <dd className="col-7 align-right">{cashierName}</dd>
                {customerName !== "Guest Customer" && (
                  <>
                    <dt className="col-5 ">Customer Name:</dt>
                    <dd className="col-7 align-right">{customerName}</dd>
                  </>
                )}
                <dt className="col-5 ">Total Quantity:</dt>
                <dd className="col-7 align-right">{quantity}</dd>

                <dt className="col-7">Sub Total:</dt>
                <dd className="col-5 align-right">{totalPrice}</dd>

                <dt className="col-7">Discount:</dt>
                <dd className="col-5 align-right">{discount}</dd>
                <dt className="col-7">Grand Total:</dt>
                <dd className="col-5 align-right">
                  <b>
                    Rs.
                    {totalPrice - discount}
                  </b>
                </dd>
                <dt className="col-7">New Loyalty Points:</dt>
                <dd className="col-5 align-right">
                  {rewardsPoints}
                </dd>
                <dt className="col-7">Payment Method Type:</dt>
                <dd className="col-5 align-right">{paymentMethod}</dd>
                {paymentMethod === "cash" && (
                  <>
                    <dt className="col-7">Cash Given:</dt>
                    <dd className="col-5 align-right">
                      Rs. {paymentDetails}.00
                    </dd>
                  </>
                )}
              </div>
            </div>
            {paymentMethod === "cash" && (
              <>
                <hr />
                <div className="col">
                  <div className="row">
                    <dt className="col-7">
                      <h5>
                        <b>Changes:</b>
                      </h5>
                    </dt>
                    <dd className="col-5 align-right">
                      <h5>
                        <b>
                          Rs.
                          {calculateChanges()}
                          .00
                        </b>
                      </h5>
                    </dd>
                  </div>
                </div>
              </>
            )}
            <hr />
          </div>
          <div className="modal-body">
            If bill is not printed use below 'Print Reciept' button to print
            again..
            <br /> otherwise confirm the order by pressing 'Get Next Order'
            button
          </div>
          <div className="modal-footer">
            <button
              type="button"
              disabled={calculateChanges() < 0}
              className="btn btn-primary"
            >
              Print Receipt
            </button>

            <button
              type="button"
              disabled={calculateChanges() < 0}
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={placeOrder}
            >
              Get Next Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryWindow;
