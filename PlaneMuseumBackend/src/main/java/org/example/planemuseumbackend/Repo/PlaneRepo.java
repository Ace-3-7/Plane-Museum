package org.example.planemuseumbackend.Repo;

import org.example.planemuseumbackend.Entities.Plane;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface PlaneRepo extends ListCrudRepository<Plane, Integer> {
    List<Plane> findByManufacturer(String manufacturer);
    List<Plane> findByType(String type);
    List<Plane> findByYearOfManufacture(int yearOfManufacture);
    List<Plane> findByCountryOfOrigin(String countryOfOrigin);
    Plane findByName(String name);
    List<Plane> findByDescription(String description);

    boolean existsByName(String name);

    Plane getPlaneById(int id);
}
