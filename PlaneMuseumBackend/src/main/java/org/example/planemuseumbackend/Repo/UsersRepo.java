package org.example.planemuseumbackend.Repo;

import org.example.planemuseumbackend.Entities.Users;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface UsersRepo extends ListCrudRepository<Users, Integer> {
    List<Users> findByName(String name);
    Users findByEmail(String email);
    Boolean existsByEmail(String email);
}
