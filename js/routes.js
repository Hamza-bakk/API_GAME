// Importez les modules de vos pages
import { Home } from './Home.js';
import { PageList } from './PageList.js';
import { PageDetail } from './PageDetail.js';

// Définissez un objet routes qui associe les routes aux modules de vos pages
const routes = {
  '': Home,        // Route pour la page d'accueil (Home)
  'pagelist': PageList,    // Route pour la liste des pages (PageList)
  'pagedetail': PageDetail,  // Route pour les détails des pages (PageDetail)
  // Ajoutez d'autres routes au besoin
};

// Exportez l'objet routes pour le rendre accessible depuis d'autres fichiers
export { routes };
