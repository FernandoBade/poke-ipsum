// components/Fundo.js
export default function Fundo() {
    return (
      <div className="fixed -z-10 h-full w-full overflow-hidden">

        <video autoPlay muted loop className="absolute w-full h-full object-cover">
          <source src="../video/bg.mp4" type="video/mp4" />
          <img src="../img/bg.png" alt="Poké Ipsum" />
        </video>
      </div>
    );
  }
