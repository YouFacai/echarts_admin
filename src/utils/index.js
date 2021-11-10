// 排序国家
export function sort(array) {
    //比较轮数
    for (var i = 0; i < array.length - 1; i++) {
        //每轮比较次数，次数=长度-1-此时的轮数
        for (var j = 0; j < array.length - 1 - i; j++) {
            if (array[j].confirmAdd < array[j + 1].confirmAdd) {
                var temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            } 
        }
    } 

    return array
}

// 排序国内
export function sortcity(array) {
    //比较轮数
    for (var i = 0; i < array.length - 1; i++) {
        //每轮比较次数，次数=长度-1-此时的轮数
        for (var j = 0; j < array.length - 1 - i; j++) {
            if (array[j].value < array[j + 1].value) {
                var temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            } 
        }
    } 

    return array
}

// 筛选各大洲数据
export const getSectorData = function(array){
    let sectorArr = [
        {
            name:'亚洲',
            value:0
        },
        {
            name:'欧洲',
            value:0
        },
        {
            name:'非洲',
            value:0
        },
        {
            name:'南美洲',
            value:0
        },
        {
            name:'北美洲',
            value:0
        },
        {
            name:'大洋洲',
            value:0
        }
    ];
    array.forEach(item=>{
        sectorArr.forEach(item2=>{
            if(item2.name == item.continent){
                item2.value = item2.value + item.confirm
            }
        })
    })
   return sectorArr
}