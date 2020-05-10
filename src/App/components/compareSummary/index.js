import React from 'react';
import './index.scss';
import Select from 'react-select';

const CompareSummary = props =>{
	const { compareSummary, selectedProducts,options } = props;
	return(
		<>  
			{compareSummary && selectedProducts.map(id=>{
				if(id=== 'select'){
					return (
						<div className="compare-summary-item">
							<div className="sel-image-box">
							</div>
							<div className="title-box" style={{marginTop:'40px'}}>
								<p className="title">Add a product</p>
							</div>
							<Select
								onChange={props.onProductSelect}
								options={options}
								placeholder="Select a product"
								className="product-select"
								isSearchable={false}
							/>

						</div>
					)
				} else {
					return(
						<div className="compare-summary-item">
							<div className="image-box">
								<img src={compareSummary.images[id]} alt="product1"/>
								<div onClick={()=>props.removeSelectedProduct(id)}>x</div>
							</div>
							<div className="title-box">
								<p className="title">{compareSummary.titles[id].title}</p>
								<p className="sub-title">{compareSummary.titles[id].subtitle}</p>
							</div>
							<div className="pricing-summary">
								<p>&#8377;{compareSummary.productPricingSummary[id].price}</p>
								<p>&#8377;{compareSummary.productPricingSummary[id].finalPrice}</p>
								<p>{compareSummary.productPricingSummary[id].totalDiscount}%off</p>
							</div>
						</div>
					)
				}
			})}
		</>  
	)
}

export default CompareSummary;
