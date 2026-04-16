import React from 'react';

const Cards = () => {
    return (
        <div>
            <div className='flex justify-center gap-4 container mx-auto'>
                <div className="card bg-base-100 w-60 shadow-sm">
  
  <div className="card-body items-center text-center">
    <h2 className="card-title">10</h2>
    <p>Total Friends</p>
    <div className="card-actions">
    </div>
  </div>
</div>
<div className="card bg-base-100 w-60 shadow-sm">
  
  <div className="card-body items-center text-center">
    <h2 className="card-title">3</h2>
    <p>On Track</p>
    <div className="card-actions">
    </div>
  </div>
</div>
<div className="card bg-base-100 w-60 shadow-sm">
  
  <div className="card-body items-center text-center">
    <h2 className="card-title">6</h2>
    <p>Needs <br/>Attention</p>
    <div className="card-actions">
    </div>
  </div>
</div>
<div className="card bg-base-100 w-60 shadow-sm">
  
  <div className="card-body items-center text-center">
    <h2 className="card-title">12</h2>
    <p>Interactions <br/>This Month</p>
    <div className="card-actions">
    </div>
  </div>
</div>
            </div>
        </div>
    );
};

export default Cards;