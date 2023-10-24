import {Bibliotheque} from "./bibliotehque/Bibliotheque";
import {Adherent} from "./bibliotehque/Adherent";
import {BandeDessinee} from "./bibliotehque/BandeDessinee";
import {Livre} from "./bibliotehque/Livre";


const bibliotheque: Bibliotheque = new Bibliotheque();

bibliotheque.empruntAnnonce$.subscribe({
    next: (emrpunt) =>  {
        console.log('*******************************************');
        console.log(`** Emprunt: ${emrpunt.description()}`);
        console.log('*******************************************');
    }
});

console.log('Ajout des adhérents');
const jdupond: Adherent = new Adherent(1, 'Jean', 'Dupond');
bibliotheque.ajouterAdherent(jdupond);
const mdubois: Adherent = new Adherent(2, 'Marie', 'Dubois');
bibliotheque.ajouterAdherent(mdubois);

console.log('Ajout des ouvrages');
bibliotheque.ajouterOuvrage(new BandeDessinee(1, 'Thorgal: La galère noire', new Date(2014, 10, 23), 4, 'Van Hamme', 'Rosinsky'));
const lesMiserables = new Livre(2, 'Les misérables', new Date(1862, 3, 30), 5, 'Hugo V.', '2-86889-006-7');
bibliotheque.ajouterOuvrage(lesMiserables);
const systeme = new Livre(3, 'Systèmes multi-agents', new Date(2009, 10, 23), 2, 'Ferber J.', '2-56784-015-2');
bibliotheque.ajouterOuvrage(systeme);

console.log('Liste de tous les ouvrages de la bibliotheque');
// Affichage des volumes
for (let volume of bibliotheque.ouvrages)
{
    console.log(volume.description());
}

console.log('');
console.log('Emprunts');
if (! bibliotheque.emprunte(jdupond, lesMiserables))
{
    console.log(`Le livre suivant n'a plus d'exemplaires de libre: ${lesMiserables.description()}`);
}
if (! bibliotheque.emprunte(jdupond, systeme))
{
    console.log(`Le livre suivant n'a plus d'exemplaires de libre: ${systeme.description()}`);
}
if (! bibliotheque.emprunte(mdubois, systeme))
{
    console.log(`Le livre suivant n'a plus d'exemplaires de libre: ${systeme.description()}`);
}
if (! bibliotheque.emprunte(jdupond, systeme))
{
    console.log(`Le livre suivant n'a plus d'exemplaires de libre: ${systeme.description()}`);
}
console.log('');

console.log('Liste des emprunts');
// Affichage des emprunts de chaque adhérent
bibliotheque.afficherEmprunts();
// Affichage des emprunts d'un adhérent
bibliotheque.afficherEmpruntsAdherent(jdupond);

// Affichage des emprunteurs d'un ouvrage inexistant
bibliotheque.afficherEmprunteursOuvrage(99);

// Affichage des emprunteurs du livre numéro 3
bibliotheque.afficherEmprunteursOuvrage(3);
