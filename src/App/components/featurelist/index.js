import React from 'react';
import './index.scss';
const FeaturesList = props =>{
	return(
		<> 
      {
        props.selectedProducts.map(id=>{
          return(
            id!=='select' && <div className="feature-list-item">
                {props.featureValues && props.featureValues.map(item=>{
                  return (
                    <>
                      {props.isShowOnlyDiff ? item.features[0].properties && item.features[0].properties.isDifferent ? 
                        <h4 className="feature-title">
                          <div style={{visibility:'hidden'}}>{item.title}</div>
                        </h4>:'':
                        <h4 className="feature-title">
                          <div style={{visibility:'hidden'}}>{item.title}</div>
                        </h4>
                      }
                      {item.features.map(feature=>
                        props.isShowOnlyDiff ? feature.properties && feature.properties.isDifferent ? <p>{feature.values[id]}</p>:'':<p>{feature.values[id]}</p>
                      )}
                    </>
                  )})
                }
              </div>
          ) 
        })
      }		
		</>  
	)
}

export default FeaturesList;
