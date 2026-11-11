import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

export default function Catalog() {
    const [clubs, setClubs] = useState<any[]>([]);
    useEffect(() => { api.getClubs().then(setClubs); }, []);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Каталог студенческих организаций</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubs.map((club: any) => (
                    <div key={club.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-100">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3">
                            {club.direction}
                        </span>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{club.name}</h2>
                        <p className="text-gray-600 mb-4 line-clamp-3">{club.description}</p>
                        <Link to={`/org/${club.id}`} className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                            Подробнее и податься
                        </Link>
                    </div>  
                ))}
            </div>
        </div>
    );
}