describe('removeItem', () => {
    let productId;
    beforeEach(() => {
        productId = 3
    })

    it("devrait retourner un tableau vide si il n'y a pas d'item panier dans le localstorage", () => {
        expect(removeItem(productId)).toEqual([])
    });

    it("devrait retourner un tableau si il y a un item panier dans le localstorage avec l'objet produit correspondant à l'id du produit supprimé du tableau", () => {
        panier = [ { name: 'tomme', _id: 3}, { name: 'abondance', _id: 1} ];
        localStorage.setItem('panier', JSON.stringify(panier));

        expect(removeItem(productId)).toHaveLength(1);
    })
})

describe('errorHandler', () => {
    it('should return an empty string if there is no error', () => {
        const error = {};
        expect(errorHandler(error)).toEqual("");
    });
})
