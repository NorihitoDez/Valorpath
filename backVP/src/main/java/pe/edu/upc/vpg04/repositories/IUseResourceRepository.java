package pe.edu.upc.vpg04.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.vpg04.entities.Resource;
import pe.edu.upc.vpg04.entities.UseResources;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IUseResourceRepository extends JpaRepository<UseResources,Integer> {
        @Query(value = "SELECT r.tipo AS recurso, COUNT(ur.id_re) AS total_usos\n" +
                "FROM usorecursos ur\n" +
                "INNER JOIN recursos r ON ur.id_re = r.idrecurso\n" +
                "GROUP BY r.tipo\n" +
                "HAVING COUNT(ur.id_re) = (\n" +
                "    SELECT MIN(total_usos)\n" +
                "    FROM (\n" +
                "        SELECT COUNT(ur.id_re) AS total_usos\n" +
                "        FROM usorecursos ur\n" +
                "        INNER JOIN recursos r ON ur.id_re = r.idrecurso" +
                "        GROUP BY r.tipo\n" +
                "    ) AS subquery\n" +
                ")\n" +
                "ORDER BY total_usos ASC;",nativeQuery = true)
        List<String[]> Rmenosutilizado();
        @Query(value = "SELECT r.tipo AS recurso, COUNT(ur.id_re) AS total_usos " +
                "FROM usorecursos ur " +
                "JOIN recursos r ON ur.id_re = r.idrecurso " +
                "WHERE ur.fecha BETWEEN :fechaInicio AND :fechaFin " +
                "GROUP BY r.idrecurso " +
                "ORDER BY total_usos DESC ", nativeQuery = true)
        List<String[]> tiporecursomasutilizado(@Param("fechaInicio") LocalDate fechaInicio, @Param("fechaFin") LocalDate fechaFin);
    }


