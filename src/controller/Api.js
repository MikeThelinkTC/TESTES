class Api {
  static BASE_URL = "https://api-kenzie-food.herokuapp.com";

  static token = localStorage.getItem("token");

  static async registerUser(userObj) {
    const response = await fetch(`${this.BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    const data = await response.json();

    return data;
  }

  static async loginUser(userObj) {
    const response = await fetch(`${this.BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    const data = await response.json();

    localStorage.setItem("token", data);

    return data;
  }

  static async getPublicProducts() {
    const response = await fetch(`${this.BASE_URL}/products`, {
      method: "GET",
      headers: {},
    });

    const data = await response.json();

    return data;
  }

  static async getPrivateProducts() {
    const response = await fetch(`${this.BASE_URL}/my/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    const data = await response.json();

    return data;
  }

  static async postNewProduct(productObj) {
    const response = await fetch(`${this.BASE_URL}/my/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(productObj),
    });

    const data = await response.json();

    return data;
  }

  static async editMyProduct(productId, editObj) {
    const response = await fetch(`${this.BASE_URL}/my/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(editObj),
    });

    const data = await response.json();

    return data;
  }

  static async deletePost(productId) {
    await fetch(`${this.BASE_URL}/my/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  static async getCart() {
    const response = await fetch(`${this.BASE_URL}/cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    const data = await response.json();

    return data;
  }

  static async cartAdd(productId) {
    const response = await fetch(`${this.BASE_URL}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(productId),
    });

    const data = await response.json();

    return data;
  }

  static async removeCart(productId) {
    await fetch(`${this.BASE_URL}/cart/remove/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}

export { Api };
