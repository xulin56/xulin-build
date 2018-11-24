import React from 'react';
import {autobind} from 'core-decorators';
import propTypes from 'prop-types';
import cityData from './city';
import './style.less';

@autobind
export default class Address extends React.Component{
    static props = {
        provinceCb : propTypes.func,
        cityCb : propTypes.func,
        countyCb : propTypes.func,
    }
    state = {
        province : '请选择省份',
        showProvince : false,
        city : '请选择城市',
        cityList : [],
        districtList : [],
        county : '请选择'
    }
    checkProvince(province) {
        const {provinceCb} = this.props;
        this.setState({
            province : province.name,
            showProvince : false,
            cityList : province.cityList,
            showCity : false
        });
        provinceCb && provinceCb(province);
    }
    checkCity(city) {
        const {cityCb} = this.props;
        this.setState({
            city : city.name,
            cityList : [],
            districtList : city.districtList
        });
        cityCb && cityCb(city);
    }
    checkCounty(county) {
        const {countyCb} = this.props;
        this.setState({
            county : county.name,
            districtList : []
        });
        countyCb && countyCb(county);
    }
    render(){
        const {showProvince,province,city,cityList,districtList,county} = this.state;
        return(
            <div className="address">
                  <div className="province-list">
                      <h2 className="checkout" onClick={()=>this.setState({showProvince:true})}>{province}</h2>
                      {
                        showProvince &&
                        <ul className="item-list">
                            {
                                cityData.map((province,provinceIndex)=>{
                                    return <li key={provinceIndex} onClick={()=>this.checkProvince(province)}>{province.name}</li>
                                })
                            }
                        </ul>
                      }
                  </div>
                  <div className="city-list">
                      <h2 className="checkout">{city}</h2>
                      {
                        cityList.length>0 &&
                        <ul className="item-list">
                            {
                              cityList.map((city,cityIndex)=>{
                                  return <li key={cityIndex} onClick={()=>this.checkCity(city)}>{city.name}</li>
                              })
                            }
                        </ul>
                      }
                  </div>
                  <div className="county-list">
                      <h2 className="checkout">{county}</h2>
                      {
                          districtList.length>0 &&
                          <ul className="item-list">
                              {
                                districtList.map((county,countyIndex)=>{
                                    return <li key={countyIndex} onClick={()=>this.checkCounty(county)}>{county.name}</li>
                                })
                              }
                          </ul>
                      }
                  </div>
            </div>
        )
    }
}
