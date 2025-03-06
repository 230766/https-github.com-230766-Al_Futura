import DatabaseTest from '../components/DatabaseTest';
import Navbar from '../components/Navbar';

// ... existing imports ...

export default function Home() {
  // ... existing code ...

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <Navbar transparent={true} />

      {/* Database Test */}
      <div className="container mx-auto pt-24">
        <DatabaseTest />
      </div>

      {/* Main Content */}
      <main>
        {/* ... rest of your existing content ... */}
      </main>
    </div>
  );
} 