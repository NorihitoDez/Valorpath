package pe.edu.upc.vpg04.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "roles",uniqueConstraints = {@UniqueConstraint(columnNames = {"userId","nameRole"})})
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRole;
    @Column(name = "nameRole", nullable = false, length = 50)
    private String nameRole;
    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private Users user;

    public Role() {
    }

    public Role(int idRole, String nameRole, Users user) {
        this.idRole = idRole;
        this.nameRole = nameRole;
        this.user = user;
    }

    public int getId() {
        return idRole;
    }

    public void setId(int id) {
        this.idRole = id;
    }

    public String getNameRole() {
        return nameRole;
    }

    public void setNameRole(String nameRole) {
        this.nameRole = nameRole;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}
