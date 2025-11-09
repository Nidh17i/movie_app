export const Home = () => {
  return (
    <>
      <div
        style={{
          position: "relative",
          height: "90vh",
          backgroundImage:
            "url('https://i.pinimg.com/1200x/49/d6/8f/49d68fc983b66770f629ff9dad146d04.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(4px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "white",
            padding: "0 20px",
          }}
        >
          <h1
            style={{
              fontSize: "60px",
              fontWeight: "800",
              textShadow: "2px 2px 10px rgba(0,0,0,0.7)",
              marginBottom: "20px",
            }}
          >
            Welcome to <span style={{ color: "#ffcc00" }}>CineHaven</span>
          </h1>

          <p
            style={{
              fontSize: "22px",
              maxWidth: "900px",
              lineHeight: "1.6",
              textShadow: "1px 1px 6px rgba(0,0,0,0.6)",
            }}
          >
            Experience cinema at its best — only on <b>CineHaven</b>. <br />
            Turning movie nights into pure bliss with stories rated by fans,
            loved by all.
          </p>
        </div>
      </div>
    </>
  );
};
