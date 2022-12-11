import {ref} from 'vue'

export const count = ref(1);
export const products = ref(new Map());

export function addToCart(productName){
    products.value.set(productName, getProductCount(productName)+1);
    count.value++;
}

export function removeFromCart(productName){
    let newCount = getProductCount(productName)-1;
    if(newCount > 0){
        products.value.set(productName, newCount);
        count.value--;
    }
    else if(newCount == 0){
        products.value.delete(productName);
        count.value--;
    }
}

export function removeAllFromCart(productName){
    let pCount = getProductCount(productName);
    count.value = count.value - pCount;
    products.value.delete(productName);
}

function getProductCount(productName){
    if(products.value.has(productName)){
        return products.value.get(productName);
    }
    else{
        return 0;
    }
}

export function isInCart(productName){
    console.log(products.value)
    return products.value.has(productName);
}