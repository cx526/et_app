   import regionData from './common/regionData.js'
   
   function parseRegData() {
      // 省级数据 name code children
      // this.regionDataAll =
      let pArray = []
      for (let i = 0; i < Object.keys(regionData['86']).length; i++) {
        let item = Object.keys(regionData['86'])[i]
        //province
        let obj = { name: '', code: '', children: [] }
        obj.name = regionData['86'][item]
        obj.code = item
        // city
        let cityArray = Object.keys(regionData[item])
        for (let j = 0; j < cityArray.length; j++) {
          let subItem = Object.keys(regionData[item])[j]
          let subObj = { name: '', code: '', children: [] }
          subObj.name = regionData[item][subItem]
          subObj.code = subItem
          // area
          if (regionData[subItem]) {
            let areaArray = Object.keys(regionData[subItem])
            if (areaArray && areaArray.length > 0) {
              for (let k = 0; k < areaArray.length; k++) {
                let innerItem = Object.keys(regionData[subItem])[k]
                if (innerItem) {
                  let innerObj = { name: '', code: ''}
                  innerObj.name = regionData[subItem][innerItem]
                  innerObj.code = innerItem
                  subObj.children.push(innerObj)
                }
              }
            }
          }
          obj.children.push(subObj)
        }
        pArray.push(obj)
      }
      // this.regionDataAll = pArray
      // console.log(pArray)
	  return pArray
  }
  
  module.exports = {
      parseRegData
  };
  