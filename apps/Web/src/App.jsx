import { useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { useLocation } from "react-router-dom";

function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    // Temporarily set isLoaded to true to bypass loading screen
    const [isLoaded, setIsLoaded] = useState(false);
    const location = useLocation();

    const handleLoadingComplete = () => {
        setIsLoaded(true);
    };

    return (
        <>
            {!isLoaded && <LoadingScreen onComplete={handleLoadingComplete} />}

            <div className="min-h-screen bg-black text-gray-100">
                {isLoaded && (
                    <>
                        <Navbar />
                        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                        <AnimatedRoutes />
                    </>
                )}
            </div>
        </>
    );
}

export default App;
