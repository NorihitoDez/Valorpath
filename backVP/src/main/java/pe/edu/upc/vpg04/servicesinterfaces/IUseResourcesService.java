package pe.edu.upc.vpg04.servicesinterfaces;

import pe.edu.upc.vpg04.entities.UseResources;

import java.time.LocalDate;
import java.util.List;

public interface IUseResourcesService {
    public List<UseResources> listaruso();
    public void insert(UseResources useResources);
    List<String[]> Rmenosutilizado();
    List<String[]> tiporecursomasutilizad(LocalDate fechaInicio, LocalDate fechaFin);
}
