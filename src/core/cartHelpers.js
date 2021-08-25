export const addItem = (item = [], count = 0, next = f => f) => {
    let cart = [];
    if (typeof window !== 'undefined') {//da li postoji window prozor
        if (localStorage.getItem('cart')) {//da li postoji unutar window-a localStorage te unutar njega naziv cart 
            //ako postoji dohvati to sta je pod 'cart'
            cart = JSON.parse(localStorage.getItem('cart'));
            //JSON.parse()-->convert JSON to object
            //JSON.stringify-->convert object to JSON
        }
        cart.push({
            ...item,
            count: 1
        });

        // remove duplicates
        // build an Array from new Set and turn it back into array using Array.from
        // so that later we can re-map it
        // new set will only allow unique values in it
        // so pass the ids of each object/product
        // If the loop tries to add the same value again, it'll get ignored
        // ...with the array of ids we got on when first map() was used
        // run map() on it again and return the actual product from the cart
        //ukratko mapiraj da maknes duplikate te ponovno spremi na localStorage
        cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
            return cart.find(p => p._id === id);
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
};
//prikaz broja produkata u kosarici, tj u local storageu, ikona za prikazat
export const itemTotal = () => {
    if (typeof window !== 'undefined') {//provjera da li je window prisutan
        if (localStorage.getItem('cart')) {//ako je, da li postoji local storage
            return JSON.parse(localStorage.getItem('cart')).length;//i vrati broj elemenata koji se nalazu u local storage
        }
    }
    return 0;//ako nema nista postavi defultnu vrijednost 0
}; 
//get cart from local storage
export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];//po default nemamo nista u kartici,prazan niz
};
//metoda za update inkrementa, dekrementa kada se povecava u kosarici
export const updateItem = (productId, count) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        //trazimo taj produkt sa tim odredenim id-om iz argumenata, trazimo po local storage-u
        cart.map((product, i) => {
            if (product._id === productId) {
                cart[i].count = count;//count od proizvoda iz card-a postavi tj dodjeli ovisno o tom sta je poslano
                //i predstavlja index od proizvoda, poziciju u nizu
            }
        });
        //postavi nazat nakon promjene
        localStorage.setItem('cart', JSON.stringify(cart));
    }
};
//metoda za brisanje proizvoda iz Cart page-a
export const removeItem = productId => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart.splice(i, 1);//splice za micanje proizvoda iz cart array-a
                //prvi argument je koji proizvod micemo po indeksu iz cart-a, a drugi argument je broj proizvoda
                //koji micemo sta je naravno 1
            }
        });
        //ponovno postavi vrijednosti u local storage, ka neki update
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
};

export const emptyCart = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
        next();
    }
};