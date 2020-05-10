import React, {Component} from 'react';
import { connect } from "react-redux";
import {bindActionCreators } from 'redux';
import './index.scss';
import { getProducts } from '../../redux/actions/productAction';
import CompareSummary from '../../components/compareSummary';
import FeaturesList from '../../components/featurelist';
class ProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProducts : ['select'],
      options : [],
      isShowOnlyDiff : false
    };
  }

  componentDidMount() {
    this.props.getProducts();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.productData.compareSummary){
      let titles = nextProps.productData.compareSummary.titles;
      let options = this.state.options;
      Object.keys(titles).forEach(key=>{
        options.push({ label:titles[key].title,value: key, isDisabled:false })
      })
      this.setState({options})
    }
  }

  onProductSelect = (e) =>{
    let {selectedProducts, options} = this.state;
    selectedProducts[selectedProducts.length - 1] = e.value;
    if(selectedProducts.length < 4)
      selectedProducts.push('select');
    options.forEach((item, index)=>{
      if(e.value === item.value) {
        options[index].isDisabled = true;
        return;
      }
    })
    this.setState({selectedProducts,options})
  }

  removeSelectedProduct = id =>{
    let {selectedProducts, options} = this.state;
    if(selectedProducts.length === 4 && selectedProducts[3]!=='select')
      selectedProducts.push('select');
    selectedProducts.splice(selectedProducts.indexOf(id),1);
    options.forEach((item, index)=>{
      if(id === item.value) {
        options[index].isDisabled = false;
        return;
      }
    })
    this.setState({selectedProducts,options})
  }

  onShowOnlyDiff = e =>{
    this.setState({'isShowOnlyDiff' : e.target.checked});
  }

  render() {
    const { productData } = this.props;
    const { selectedProducts, isShowOnlyDiff } = this.state;
    return(
      <div className="product-container">
          <div className="compare-summary">
            <div className="compare-selected">
              <div className="compare-text">
                <span>Compare</span>
                <span>{selectedProducts[selectedProducts.length-1] === 'select' ? selectedProducts.length - 1 : selectedProducts.length} Item selected</span>
              </div>
              <div className="only-diff-checkbox">
                <input type="checkbox"  onChange={this.onShowOnlyDiff}/>
                <label>Show only differences</label>
              </div>
            </div>
            <CompareSummary 
              compareSummary={productData.compareSummary}
              selectedProducts={selectedProducts}
              options={this.state.options}
              onProductSelect ={ this.onProductSelect}
              removeSelectedProduct={this.removeSelectedProduct}
            />
          </div>
          <div className="feature-list-body">
            <div className="feature-headings">
            {
              productData.featuresList && productData.featuresList.map((item,index)=>{
                return (
                  <>
                    {/* <h4 className="feature-title">{item.title}{JSON.stringify(item[0])}</h4> */}
                    {isShowOnlyDiff ? item.features[0].properties && item.features[0].properties.isDifferent ? <h4 className="feature-title">{item.title}</h4>:'':<h4 className="feature-title">{item.title}</h4>}
                    {item.features.map(feature=>
                      isShowOnlyDiff ? feature.properties && feature.properties.isDifferent ? <p>{feature.featureName}</p>:'':<p>{feature.featureName}</p>
                    )}
                  </>
                )
              })
            }
            </div>
            <FeaturesList 
              featureValues={productData.featuresList} 
              selectedProducts={selectedProducts}
              isShowOnlyDiff={this.state.isShowOnlyDiff}
            /> 
          </div>
      </div> 
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.products.productData)
  return {
    productData : state.products.productData ? state.products.productData : {}
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getProducts
  },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductView);
