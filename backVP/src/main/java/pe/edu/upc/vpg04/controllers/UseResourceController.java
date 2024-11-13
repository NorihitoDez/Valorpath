package pe.edu.upc.vpg04.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.vpg04.dtos.LessUsedResourceDTO;
import pe.edu.upc.vpg04.dtos.MostUsebetweendateDTO;
import pe.edu.upc.vpg04.dtos.UseResourcesDTO;
import pe.edu.upc.vpg04.entities.UseResources;
import pe.edu.upc.vpg04.servicesinterfaces.IUseResourcesService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usorecurso")
public class UseResourceController {
    @Autowired
    private IUseResourcesService iurs;

    @GetMapping
    public List<UseResourcesDTO> listarusos()
    {
        return iurs.listaruso().stream().map(x->
        {
            ModelMapper m= new ModelMapper();
            return m.map(x, UseResourcesDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping
    public void registrar(@RequestBody UseResourcesDTO dto)
    {
        ModelMapper m= new ModelMapper();
        UseResources res =m.map(dto, UseResources.class);
        iurs.insert(res);
    }

    @GetMapping("/menosutilizado")
    //@PreAuthorize("hasAnyAuthority('PSICOLOGO')")
    public List<LessUsedResourceDTO> Recursomenosutilizado()
    {
        List<String[]> lista=iurs.Rmenosutilizado();
        List<LessUsedResourceDTO> listdto=new ArrayList<>();
        for(String[] column:lista)
        {
            LessUsedResourceDTO dto=new LessUsedResourceDTO();
            dto.setTiporecurso(column[0]);
            dto.setTotalusos(Integer.parseInt(column[1]));
            listdto.add(dto);
        }
        return listdto;
    }
    @GetMapping("/maasutilizadoportiempo")
    //@PreAuthorize("hasAnyAuthority('PSICOLOGO')")
    public List<MostUsebetweendateDTO> recursomasutilizadoportiempo(@RequestParam LocalDate fechainicio, @RequestParam LocalDate fechafin) {
        List<String[]> lista = iurs.tiporecursomasutilizad(fechainicio, fechafin);
        List<MostUsebetweendateDTO> listadto = new ArrayList<>();
        for (String[] columna : lista) {
            MostUsebetweendateDTO dto = new MostUsebetweendateDTO();
            dto.setTiporecurso(columna[0]);
            dto.setTotalusos(Integer.parseInt(columna[1]));
            listadto.add(dto);
        }
        return listadto;
    }
}
