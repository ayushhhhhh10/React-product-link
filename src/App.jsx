import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [product, setproduct] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    async function showProduct() {
      let res = await axios.get("https://mejevo.pythonanywhere.com/product/");
      setproduct(res.data);
    }
    showProduct();
  }, []);

  async function handleClick(e) {
    e.preventDefault();
    let data = {
      cname:name,
      cemail:email,
      mob:number,
      product:`https://mejevo.pythonanywhere.com/product/${id}`
    }
    console.log(data);
    try {
      const response = await axios.post(
        "https://mihexem7.pythonanywhere.com/customer/",
        data
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form className="shadow-xl p-10" onSubmit={handleClick}>
        Customer Name
        <input
          className="border-2 border-black px-1 mt-5 ml-2"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        Customer Email
        <input
          className="border-2 border-black px-1 mt-5 ml-2"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        Mobile
        <input
          className="border-2 border-black px-1 mt-5 ml-2"
          type="number"
          onChange={(e) => setNumber(e.target.value)}
        />
        <br />
        <select
          className="border-2 border-black px-1 mt-5"
          onChange={(e) => setId(e.target.value)}
        >
          {product.map((v, i) => {
            return (
              <option key={i} value={v.id}>
                {v.id} {v.name} {v.price} {v.cat} {v.cmp}
              </option>
            );
          })}
        </select>
        <br />
        <button className="px-3 py-1 bg-blue-600 rounded-md mt-5 text-white">
          Add
        </button>
      </form>
    </div>
  );
};

export default App;
