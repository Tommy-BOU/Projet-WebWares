import { createStore } from 'vuex'


export default createStore({
  state: {
    cartItems: [],
    favorites: [],
    produits: [
      {
        id: 1,
        image: require('@/assets/mobilier-5.jpg'),
        titre: 'Table à manger en bois',
        description: 'Table à manger en bois massif avec finition élégante.',
        prix: 299.99,
        moq: 5,
        categorieId: 1
      },
      {
        id: 2,
        image: require('@/assets/luminaire-1.jpg'),
        titre: 'Lampe moderne',
        description: 'Lampe avec un design moderne et éclairage ajustable.',
        prix: 129.99,
        moq: 10,
        categorieId: 2
      },
      {
        id: 3,
        image: require('@/assets/tapis-2.jpg'),
        titre: 'Tapis en laine',
        description: 'Tapis doux en laine avec motif géométrique.',
        prix: 89.99,
        moq: 20,
        categorieId: 3
      },
      {
        id: 4,
        image: require('@/assets/deco-3.jpg'),
        titre: 'Vase éthnique en argile',
        description: 'Vase éthnique en argile avec motifs gravés à la main.',
        prix: 49.99,
        moq: 20,
        categorieId: 4
      },
      {
        id: 5,
        image: require('@/assets/deco-4.jpg'),
        titre: 'Vase éthnique en argile',
        description: 'Vase éthnique en argile avec motifs gravés à la main.',
        prix: 49.99,
        moq: 20,
        categorieId: 4
      },
      {
        id: 6,
        image: require('@/assets/deco-5.jpg'),
        titre: 'Vase éthnique en argile',
        description: 'Vase éthnique en argile avec motifs gravés à la main.',
        prix: 49.99,
        moq: 20,
        categorieId: 4
      },
      {
        id: 7,
        image: require('@/assets/mobilier-1.jpg'),
        titre: 'Table à manger en bois',
        description: 'Table à manger en bois massif avec finition élégante.',
        prix: 69.99,
        moq: 5,
        categorieId: 1
      },
      {
        id: 8,
        image: require('@/assets/tapis-1.jpg'),
        titre: 'Tapis cool',
        description: 'Tapis très cool.',
        prix: 129.99,
        moq: 10,
        categorieId: 3
      },
      {
        id: 9,
        image: require('@/assets/tapis-3.jpg'),
        titre: 'Tapis oriental',
        description: 'Tapis doux en laine avec motif géométrique.',
        prix: 89.99,
        moq: 20,
        categorieId: 3
      },
      {
        id: 10,
        image: require('@/assets/luminaire-5.jpg'),
        titre: 'Luminaire intéressant',
        description: 'Vase éthnique en argile avec motifs gravés à la main.',
        prix: 39.99,
        moq: 20,
        categorieId: 2
      },
      {
        id: 11,
        image: require('@/assets/luminaire-2.jpg'),
        titre: 'Lumière en argent',
        description: 'Vase éthnique en argile avec motifs gravés à la main.',
        prix: 45.99,
        moq: 20,
        categorieId: 2
      },
      {
        id: 12,
        image: require('@/assets/mobilier-2.jpg'),
        titre: 'Etagère simple en bois',
        description: 'Vase éthnique en argile avec motifs gravés à la main.',
        prix: 29.99,
        moq: 20,
        categorieId: 1
      },
      {
        id: 13,
        image: require('@/assets/mobilier-3.jpg'),
        titre: 'Canapé en cuir marron',
        description: 'Vase éthnique en argile avec motifs gravés à la main.',
        prix: 259.99,
        moq: 2,
        categorieId: 1
      },
      {
        id: 14,
        image: require('@/assets/mobilier-4.jpg'),
        titre: 'Canapé turquoise confortable',
        description: 'Vase éthnique en argile avec motifs gravés à la main.',
        prix: 269.99,
        moq: 2,
        categorieId: 1
      },
      {
        id: 15,
        image: require('@/assets/deco-1.jpg'),
        titre: 'Paire de vases en bois',
        description: 'Vase éthnique en argile avec motifs gravés à la main.',
        prix: 49.99,
        moq: 20,
        categorieId: 4
      },
      {
        id: 16,
        image: require('@/assets/luminaire-3.jpg'),
        titre: 'Luminaire extérieur en bambou',
        description: 'Tapis doux en laine avec motif géométrique.',
        prix: 89.99,
        moq: 10,
        categorieId: 2
      },
      {
        id: 17,
        image: require('@/assets/deco-2.jpg'),
        titre: 'Vase texturé vert menthe',
        description: 'Vase éthnique en argile avec motifs gravés à la main.',
        prix: 49.99,
        moq: 20,
        categorieId: 4
      },
      {
        id: 18,
        image: require('@/assets/luminaire-4.jpg'),
        titre: 'Lumière d\'intérieur chic',
        description: 'Tapis doux en laine avec motif géométrique.',
        prix: 89.99,
        moq: 10,
        categorieId: 2
      },
      {
        id: 19,
        image: require('@/assets/tapis-4.jpg'),
        titre: 'Tapis éléphant mignon',
        description: 'Tapis doux en laine avec motif géométrique.',
        prix: 59.99,
        moq: 20,
        categorieId: 3
      },
      {
        id: 20,
        image: require('@/assets/tapis-5.jpg'),
        titre: 'Tapis à poils longs confortable',
        description: 'Tapis doux en laine avec motif géométrique.',
        prix: 59.99,
        moq: 20,
        categorieId: 3
      },

    ],
    categories: [
      { id: 1, name: 'Mobilier d\'intérieur' },
      { id: 2, name: 'Luminaires' },
      { id: 3, name: 'Tapis' },
      { id: 4, name: 'Objets de décorations' }
    ],
    // Etat global -> propriété de données partagées par tous les composants 

  },
  mutations: {
    // Mutations -> méthodes qui modifient les propriétés de l'état global, synchrone

    ADD_TO_CART(state, product) {
      const existingItem = state.cartItems.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cartItems.push({ ...product, quantity: product.moq });
      }

      state.cartCount = state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    REMOVE_FROM_CART(state, product) {
      const index = state.cartItems.findIndex(cartItem => cartItem.id === product.id);

      if (index !== -1) {
        state.cartItems.splice(index, 1);
        state.cartCount = state.cartItems.reduce((total, item) => total + item.quantity, 0);
      }
    },
    ADD_TO_FAVORITES(state, product) {
      state.favorites.push(product);
    },
    REMOVE_FROM_FAVORITES(state, product) {
      const index = state.favorites.findIndex((fav) => fav.id === product.id);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      }
    },
    SET_FAVORITES(state, newFavorites) {
      state.favorites = newFavorites;
    },
  },
  actions: {
    // Actions -> méthodes asynchrone
  },
  getters: {
    // Getters -> propriétés calculées partagées par tous les composants ( computed)
    getItemsInCart(state) {
      return state.cartItems;
    },
    getPriceTotal(state){
      return state.priceTotal;
    }
  },
})
