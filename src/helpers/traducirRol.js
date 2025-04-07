

export const traducirRol = (rol) => {
    switch (rol) {
      case "ADMIN_ROLE":
        return "ADMIN";
      case "ENCARGADOFRAY_ROLE":
        return "Encargado Fray";
      case "ENCARGADOGALINDEZ_ROLE":
        return "Encargado Galindez";
      case "ENCARGADOINMOBILIARIA_ROLE":
        return "Encargado Inmobiliaria";
      default:
        return rol;
    }
  };