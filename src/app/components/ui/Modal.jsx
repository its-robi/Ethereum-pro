import React, { useState } from "react";
import styles from "../../page.module.css";


const Modal = () => {
  const [crypto, setCrypto] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [total_vol, setTotal_vol] = useState("");
  const [market_cap_change, setMarket_cap_change] = useState("");
  const [one_hour, setOne_hour] = useState("");
  const [twenty_four_hour, setTwenty_four_hour] = useState("");
  const [seven_day, setSeven_day] = useState("");
  const [logo_link, setLogo_link] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(true);

  const AddCrypto = () => {
    if (
      name &&
      price &&
      total_vol &&
      market_cap_change &&
      one_hour &&
      twenty_four_hour &&
      seven_day &&
      logo_link
    ) {
      fetch("https://66dbffa347d749b72aca79e6.mockapi.io/api/v1/crypto", {
        method: "POST",
        body: JSON.stringify({
          name,
          price,
          total_vol,
          market_cap_change,
          one_hour,
          twenty_four_hour,
          seven_day,
          logo_link,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCrypto([...crypto, data]);
          setName("");
          setPrice("");
          setTotal_vol("");
          setMarket_cap_change("");
          setOne_hour("");
          setTwenty_four_hour("");
          setSeven_day("");
          setLogo_link("");
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalVisible(false);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {isModalVisible && (
        <div className={styles.modal_overlay}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              &times;   
            </button>
            <form onSubmit={handleSubmit}>
              <h1 className={styles.modal_title}>Add Crypto</h1>
              <div>
                <label className={styles.label} htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.form_input}
                  type="text"
                  required
                />
              </div>
              <div className={styles.two}>
                <div>
                  <label htmlFor="price">Price</label>
                  <input
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={styles.form_input}
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="total_vol">Total Volume</label>
                  <input
                    id="total_vol"
                    value={total_vol}
                    onChange={(e) => setTotal_vol(e.target.value)}
                    className={styles.form_input}
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className={styles.two}>
                <div>
                  <label htmlFor="market_cap_change">Market Cap Change</label>
                  <input
                    id="market_cap_change"
                    value={market_cap_change}
                    onChange={(e) => setMarket_cap_change(e.target.value)}
                    className={styles.form_input}
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="one_hour">1h move</label>
                  <input
                    id="one_hour"
                    value={one_hour}
                    onChange={(e) => setOne_hour(e.target.value)}
                    className={styles.form_input}
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className={styles.two}>
                <div>
                  <label htmlFor="twenty_four_hour">24h move</label>
                  <input
                    id="twenty_four_hour"
                    value={twenty_four_hour}
                    onChange={(e) => setTwenty_four_hour(e.target.value)}
                    className={styles.form_input}
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="seven_day">7d move</label>
                  <input
                    id="seven_day"
                    value={seven_day}
                    onChange={(e) => setSeven_day(e.target.value)}
                    className={styles.form_input}
                    type="text"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="logo_link">Logo link</label>
                <input
                  id="logo_link"
                  value={logo_link}
                  onChange={(e) => setLogo_link(e.target.value)}
                  className={styles.form_input}
                  type="text"
                  required
                />
              </div>
              <button
                onClick={AddCrypto}
                type="submit"
                className={styles.addCrypto}
              >
                Add Crypto
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
