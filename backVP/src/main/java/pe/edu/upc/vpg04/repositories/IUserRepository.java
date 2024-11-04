package pe.edu.upc.vpg04.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.vpg04.entities.Users;

import java.util.List;

@Repository
public interface IUserRepository extends JpaRepository<Users, Integer> {
    public Users findByUsername(String username);

    @Query("select r.user from Role r where r.nameRole= :rol")
    public List<Users> listarPorRol(String rol);
}
