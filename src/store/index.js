import { createStore } from 'vuex'

export default createStore({
  state: {
    listOfOrders: [
      {
        orderNumber: 1,
        titreProduits: ['Table à manger en bois', 'Lampe moderne'],
        prixArticles: [1499.95, 1299.90],
        prixUnitaire:[299.99, 129.99],
        quantité: [5, 10],
        coutTotal: 2799.85,
        entreprise: 'Entreprise A',
        adresse: '123 Rue de la République',
        codePostal: '75001',
        ville: 'Paris',
        delivered: false,
      },
    ],
    listOfUsers: [
      {
        id: 1,
        raisonSociale: 'Admin',
        siret: '12345678900000',
        adresse: '1 Rue de notre site',
        codePostal: '99999',
        ville: 'Villesite',
        email: 'admin@admin.com',
        motDePasse: 'admin',
        role: 'ADMIN'
      },
      {
        id: 2,
        raisonSociale: 'Entreprise A',
        siret: '12345678901234',
        adresse: '123 Rue de la République',
        codePostal: '75001',
        ville: 'Paris',
        email: 'entrepriseA@example.com',
        motDePasse: 'motdepasseA',
        role: 'USER'
      },
      {
        id: 3,
        raisonSociale: 'Entreprise B',
        siret: '56789012345678',
        adresse: '456 Avenue des Champs-Élysées',
        codePostal: '75008',
        ville: 'Paris',
        email: 'entrepriseB@example.com',
        motDePasse: 'motdepasseB',
        role: 'USER'
      },
    ],
    identite: 'guest',
    groupe: 'GUEST',
    cartItems: [],
    cartCount: 0,
    favorites: [],
    actualProducts: [],
    produits: [
      {
        id: 1,
        image: require('@/assets/mobilier-5.jpg'),
        titre: 'Table à manger en bois',
        description: 'Table à manger en bois massif avec finition élégante.',
        prix: 299.99,
        moq: 5,
        categorieId: 1,
      },
      {
        id: 2,
        image: require('@/assets/luminaire-1.jpg'),
        titre: 'Lampe moderne',
        description: 'Lampe avec un design moderne et éclairage ajustable.',
        prix: 129.99,
        moq: 10,
        categorieId: 2,
      },
      {
        id: 3,
        image: require('@/assets/tapis-2.jpg'),
        titre: 'Tapis en laine',
        description: 'Tapis doux en laine avec motif géométrique.',
        prix: 89.99,
        moq: 20,
        categorieId: 3,
      },
      {
        id: 4,
        image: require('@/assets/deco-3.jpg'),
        titre: 'Vase éthnique en argile',
        description: 'Vase éthnique en argile avec motifs gravés à la main.',
        prix: 49.99,
        moq: 20,
        categorieId: 4,
      },
      {
        id: 5,
        image: require('@/assets/deco-4.jpg'),
        titre: 'Vase éthnique en argile',
        description: 'Vase éthnique en argile avec motifs gravés à la main.',
        prix: 49.99,
        moq: 20,
        categorieId: 4,
      },
      {
        id: 6,
        image: require('@/assets/deco-5.jpg'),
        titre: 'Vase éthnique en argile',
        description: 'Vase éthnique en argile avec motifs gravés à la main.',
        prix: 49.99,
        moq: 20,
        categorieId: 4,
      },
      {
        id: 7,
        image: require('@/assets/mobilier-1.jpg'),
        titre: 'Table à manger en bois',
        description: 'Table à manger en bois massif avec finition élégante.',
        prix: 69.99,
        moq: 5,
        categorieId: 1,
      },
      {
        id: 8,
        image: require('@/assets/tapis-1.jpg'),
        titre: 'Tapis cool',
        description: 'Tapis très cool.',
        prix: 129.99,
        moq: 10,
        categorieId: 3,
      },
      {
        id: 9,
        image: require('@/assets/tapis-3.jpg'),
        titre: 'Tapis oriental',
        description: 'Tapis doux en laine avec motif géométrique.',
        prix: 89.99,
        moq: 20,
        categorieId: 3,
      },
      {
        id: 10,
        image: require('@/assets/luminaire-5.jpg'),
        titre: 'Luminaire intéressant',
        description: 'Vase éthnique en argile avec motifs gravés à la main.',
        prix: 39.99,
        moq: 20,
        categorieId: 2,
      },
      {
        id: 11,
        image: require('@/assets/luminaire-2.jpg'),
        titre: 'Lumière en argent',
        description: 'Vase éthnique en argile avec motifs gravés à la main.',
        prix: 45.99,
        moq: 20,
        categorieId: 2,
      },
      {
        id: 12,
        image: require('@/assets/mobilier-2.jpg'),
        titre: 'Etagère simple en bois',
        description: 'Vase éthnique en argile avec motifs gravés à la main.',
        prix: 29.99,
        moq: 20,
        categorieId: 1,
      },
      {
        id: 13,
        image: require('@/assets/mobilier-3.jpg'),
        titre: 'Canapé en cuir marron',
        description: 'Vase éthnique en argile avec motifs gravés à la main.',
        prix: 259.99,
        moq: 2,
        categorieId: 1,
      },
      {
        id: 14,
        image: require('@/assets/mobilier-4.jpg'),
        titre: 'Canapé turquoise confortable',
        description: 'Vase éthnique en argile avec motifs gravés à la main.',
        prix: 269.99,
        moq: 2,
        categorieId: 1,
      },
      {
        id: 15,
        image: require('@/assets/deco-1.jpg'),
        titre: 'Paire de vases en bois',
        description: 'Vase éthnique en argile avec motifs gravés à la main.',
        prix: 49.99,
        moq: 20,
        categorieId: 4,
      },
      {
        id: 16,
        image: require('@/assets/luminaire-3.jpg'),
        titre: 'Luminaire extérieur en bambou',
        description: 'Tapis doux en laine avec motif géométrique.',
        prix: 89.99,
        moq: 10,
        categorieId: 2,
      },
      {
        id: 17,
        image: require('@/assets/deco-2.jpg'),
        titre: 'Vase texturé vert menthe',
        description: 'Vase éthnique en argile avec motifs gravés à la main.',
        prix: 49.99,
        moq: 20,
        categorieId: 4,
      },
      {
        id: 18,
        image: require('@/assets/luminaire-4.jpg'),
        titre: 'Lumière d\'intérieur chic',
        description: 'Tapis doux en laine avec motif géométrique.',
        prix: 89.99,
        moq: 10,
        categorieId: 2,
        isFavorite: false,
      },
      {
        id: 19,
        image: require('@/assets/tapis-4.jpg'),
        titre: 'Tapis éléphant mignon',
        description: 'Tapis doux en laine avec motif géométrique.',
        prix: 59.99,
        moq: 20,
        categorieId: 3,
      },
      {
        id: 20,
        image: require('@/assets/tapis-5.jpg'),
        titre: 'Tapis à poils longs confortable',
        description: 'Tapis doux en laine avec motif géométrique.',
        prix: 59.99,
        moq: 20,
        categorieId: 3,
      },

    ],
    categories: [
      { id: 1, name: "Mobilier d'intérieur" },
      { id: 2, name: 'Luminaires' },
      { id: 3, name: 'Tapis' },
      { id: 4, name: 'Objets de décoration' }
    ],
    // Etat global -> propriété de données partagées par tous les composants 

  },
  mutations: {
    // Mutations -> méthodes qui modifient les propriétés de l'état global, synchrone
    CHANGE_IDENTITY(state, newIdentity) {
      state.identite = newIdentity;
    },
    CHANGE_GROUP(state, newGroup) {
      state.groupe = newGroup;
    },
    ADD_TO_CART(state, product) {
      const existingItem = state.cartItems.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cartItems.push({ ...product, quantity: product.moq });
      }

      state.cartCount = state.cartItems.reduce((total, item) => total + item.quantity, 0);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART(state, product) {
      const index = state.cartItems.findIndex(cartItem => cartItem.id === product.id);

      if (index !== -1) {
        state.cartItems.splice(index, 1);
        state.cartCount = state.cartItems.reduce((total, item) => total + item.quantity, 0);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    EMPTY_CART(state) {
      state.cartItems = [];
      localStorage.setItem('cartItems', []);
    },
    SET_CART_ITEMS(state, newCartItems) {
      state.cartItems = newCartItems;
      state.cartCount = newCartItems.reduce((total, item) => total + item.quantity, 0);
    },
    ADD_TO_FAVORITES(state, product) {
      state.favorites.push(product);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    REMOVE_FROM_FAVORITES(state, product) {
      const index = state.favorites.findIndex((fav) => fav.id === product.id);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    SET_FAVORITES(state, newFavorites) {
      state.favorites = newFavorites;
    },
    LOG_IN_USER(state, loggedInUserId) {
      state.identite = loggedInUserId;
    },
    PLACE_NEW_ORDER(state, object) {
      state.listOfOrders.push(object);
    },
    SET_ACTUAL_PRODUCTS(state, newActualProducts) {
      state.actualProducts = newActualProducts;
    },
    REMOVE_FROM_STOCK(state, index) {
      const updatedActualProducts = [...state.actualProducts];
      updatedActualProducts.splice(index, 1);
      state.actualProducts = updatedActualProducts;
      localStorage.setItem('actualProducts', JSON.stringify(state.actualProducts));
    },
    ADD_NEW_PRODUCT(state, newProduct) {
      const id = state.actualProducts.length + 1;
      const product = {
        id,
        ...newProduct,
      };
      state.actualProducts.push(product);
      localStorage.setItem('actualProducts', JSON.stringify(state.actualProducts));
    },
    EDIT_PRODUCT(state, { index, product }) {
      state.actualProducts.splice(index, 1, product);
      localStorage.setItem('actualProducts', JSON.stringify(state.actualProducts));
    },
    SET_ORDERS(state){
      state.listOfOrders = JSON.parse(localStorage.getItem("orders"));
    }

  },
  actions: {
    // Actions -> méthodes asynchrone
    logInUser(context, loggedInUserId) {
      context.commit('LOG_IN_USER', loggedInUserId);
    },
    placeNewOrder({ commit }, orderData) {
      commit('PLACE_NEW_ORDER', orderData);
      commit('EMPTY_CART');
    },
    setActualProducts({ commit, state }, newActualProducts) {
      commit('SET_ACTUAL_PRODUCTS', newActualProducts);
      localStorage.setItem('actualProducts', JSON.stringify(state.actualProducts));
    }
  },
  getters: {
    // Getters -> propriétés calculées partagées par tous les composants ( computed)
    getItemsInCart(state) {
      return state.cartItems;
    },
    getPriceTotal(state) {
      return state.priceTotal;
    }
  },
})