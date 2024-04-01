export default function Index() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">
            Bem-vindo ao <span className="text-blue-600">Poke Ipsum</span>
          </h1>

          <p className="mt-3 text-2xl">
            Gere seu texto de placeholder inspirado no mundo Pokémon!
          </p>
        </main>
      </div>
    );
  }
