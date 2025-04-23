import { useState, useEffect } from "react";
import { manejarRegistro } from "../../controllers/authController"; // Asegúrate que la ruta sea correcta
import { RiMailFill, RiEyeFill, RiEyeOffFill, RiUserFill, RiShieldUserFill } from "react-icons/ri"; // Importa RiUserFill y RiShieldUserFill
import { FaLock } from "react-icons/fa";
import logo from '../../assets/astor-logo-removebg-preview.png'; // Asegúrate que la ruta sea correcta

const NuevoUsuario = () => {
    // --- State Variables ---
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [roles, setRoles] = useState([]);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Para deshabilitar el botón durante el envío

    // --- Effects ---
    // Timer to clear success/error messages
    useEffect(() => {
        let timer;
        if (success || error) {
            timer = setTimeout(() => {
                setSuccess("");
                setError("");
            }, 4000); // Aumentado a 4 segundos
        }
        // Cleanup function to clear timer if component unmounts or success/error changes
        return () => clearTimeout(timer);
    }, [success, error]);

    // --- Helper Functions ---
    // Reset form fields
    const resetFields = () => {
        setNombre('');
        setEmail('');
        setPassword('');
        setRoles([]);
        setShowPassword(false); // También resetear la visibilidad de la contraseña
    }

    // Handle role checkbox changes
    const handleRoleChange = (e) => {
        const { value, checked } = e.target;
        setRoles((prev) =>
            checked
                ? [...prev, value] // Add role if checked
                : prev.filter((r) => r !== value) // Remove role if unchecked
        );
    };

    // --- Event Handlers ---
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return; // Prevent multiple submissions
        if (roles.length === 0) {
             setError("Debes seleccionar al menos un rol.");
             return;
        }

        setIsSubmitting(true);
        setError(""); // Clear previous errors
        setSuccess(""); // Clear previous success messages

        await manejarRegistro({
            nombre,
            password,
            email,
            roles,
            setError,
            setUser: null, // Asumiendo que no necesitas actualizar el usuario aquí
            setSuccess,
            resetFields // Pasa la función para limpiar campos si el registro es exitoso
        });

        setIsSubmitting(false);
    }

    // --- Role Definitions ---
    // Para facilitar la gestión y evitar errores tipográficos
    const roleOptions = [
        { value: "USER_ROLE", label: "Usuario" },
        { value: "ADMIN_ROLE", label: "Administrador" },
        { value: "ENCARGADOFRAY_ROLE", label: "Encargado Fray" },
        { value: "ENCARGADOGALINDEZ_ROLE", label: "Encargado Galindez" },
        { value: "ENCARGADOINMOBILIARIA_ROLE", label: "Encargado Inmobiliaria" },
    ];

    // --- Render ---
    return (
        <div className='min-h-screen flex items-center justify-center  p-4'>
            {/* Card Container */}
            <div className='bg-secondary-100 p-10 rounded-xl mb-44 shadow-2xl w-full max-w-3xl'> {/* Aumentado max-width */}
                <img src={logo} alt="Logo-Astor" className='w-32 h-32 mx-auto mb-4 drop-shadow-md' /> {/* Ajustado tamaño y sombra */}
                <h1 className='text-3xl text-center mb-8 font-bold tracking-wide text-white uppercase'>
                    Crear <span className='text-primary'>Nuevo Usuario</span>
                </h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className='mb-6'>
                    {/* Grid Layout for Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Nombre Input */}
                        <div className='relative'>
                            <RiUserFill className='absolute top-1/2 -translate-y-1/2 left-3 text-primary' /> {/* Icono cambiado y color */}
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className='py-3 pl-10 pr-4 bg-secondary-900 w-full text-gray-300 outline-none rounded-lg focus:border focus:border-primary transition-colors'
                                placeholder='Nombre Completo'
                                required
                                aria-label="Nombre Completo"
                            />
                        </div>

                        {/* Email Input */}
                        <div className='relative'>
                            <RiMailFill className='absolute top-1/2 -translate-y-1/2 left-3 text-primary' />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='py-3 pl-10 pr-4 bg-secondary-900 w-full text-gray-300 outline-none rounded-lg focus:border focus:border-primary transition-colors'
                                placeholder='Correo electrónico'
                                required
                                aria-label="Correo electrónico"
                            />
                        </div>

                        {/* Password Input - Spanning full width */}
                        <div className='relative md:col-span-2'>
                            <FaLock className='absolute top-1/2 -translate-y-1/2 left-3 text-primary' />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='py-3 pl-10 pr-10 bg-secondary-900 w-full text-gray-300 outline-none rounded-lg focus:border focus:border-primary transition-colors'
                                placeholder='Contraseña (mínimo 6 caracteres)' // Añadida sugerencia
                                required
                                minLength={6} // Asegura mínimo 6 caracteres en HTML
                                aria-label="Contraseña"
                            />
                            <button
                                type="button" // Important: prevent form submission on icon click
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 hover:text-primary transition-colors'
                                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                            </button>
                        </div>
                    </div>

                    {/* Roles Section - Spanning full width */}
                    <div className="mb-8 md:col-span-2">
                        <label className="block mb-4 font-medium text-white text-lg flex items-center gap-2"> {/* Etiqueta más prominente */}
                            <RiShieldUserFill className="text-primary" /> Seleccionar Roles:
                        </label>
                        {/* Grid Layout for Checkboxes */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                            {roleOptions.map((role) => (
                                <label key={role.value} className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer transition-colors text-sm">
                                    <input
                                        type="checkbox"
                                        value={role.value}
                                        checked={roles.includes(role.value)}
                                        onChange={handleRoleChange}
                                        className="form-checkbox h-4 w-4 text-primary bg-secondary-900 border-gray-600 rounded focus:ring-primary cursor-pointer" // Estilos mejorados para checkbox
                                    />
                                    {role.label}
                                </label>
                            ))}
                        </div>
                         {/* Error específico para roles */}
                         {error && error.includes("rol") && (
                            <p className="text-red-400 text-xs mt-2">{error}</p>
                        )}
                    </div>

                    {/* Submit Button - Spanning full width */}
                    <div className="md:col-span-2">
                        <button
                            type='submit'
                            disabled={isSubmitting} // Deshabilitar mientras se envía
                            className={`bg-primary text-black w-full py-3 px-4 rounded-lg text-sm font-bold uppercase hover:bg-primary/80 transition-all duration-300 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Registrando...' : 'Registrar Usuario'} {/* Texto dinámico del botón */}
                        </button>
                    </div>
                </form>

                {/* Success Message */}
                {success && (
                    <div className="bg-green-600/90 border border-green-400 text-white text-sm px-4 py-3 rounded-md text-center mt-4 shadow-md animate-pulse"> {/* Animación sutil */}
                        {success}
                    </div>
                )}

                {/* General Error Message (excluding role error handled above) */}
                 {error && !error.includes("rol") && (
                    <div className="bg-red-500/90 border border-red-400 text-white text-sm px-4 py-3 mb-4 rounded text-center shadow-md">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NuevoUsuario;