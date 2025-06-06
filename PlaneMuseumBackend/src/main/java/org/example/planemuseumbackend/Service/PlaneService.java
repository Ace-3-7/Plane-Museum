package org.example.planemuseumbackend.Service;

import lombok.AllArgsConstructor;
import org.example.planemuseumbackend.Dto.PlaneDTO;
import org.example.planemuseumbackend.Entities.Plane;
import org.example.planemuseumbackend.Repo.PlaneRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class PlaneService {
    private final PlaneRepo planeRepo;

    @Transactional
    public void createPlane(PlaneDTO requestDto) {
        if(requestDto.getManufacturer() == null || requestDto.getName() == null || requestDto.getType() == null || requestDto.getYearOfManufacture() == 0 || requestDto.getCountryOfOrigin() == null || requestDto.getDescription() == null || requestDto.getImageUrl() == null) {
            throw new IllegalArgumentException("Check fields again");
        }
        if(planeRepo.existsByName(requestDto.getName())) {
            throw new IllegalArgumentException("Plane with this name already exists");
        }
        if(requestDto.getDescription().length() > 254) {
            throw new IllegalArgumentException("Description is too long");
        }
        Plane plane = new Plane();
        plane.setManufacturer(requestDto.getManufacturer());
        plane.setName(requestDto.getName());
        plane.setType(requestDto.getType());
        plane.setYearOfManufacture(requestDto.getYearOfManufacture());
        plane.setCountryOfOrigin(requestDto.getCountryOfOrigin());
        plane.setDescription(requestDto.getDescription());
        plane.setImageUrl(requestDto.getImageUrl());
        planeRepo.save(plane);
    }

    @Transactional
    public void updatePlane(int id, PlaneDTO requestDto) {
        try{
        Plane plane = planeRepo.getPlaneById(id);
            if(planeRepo.existsByName(requestDto.getName())){
                throw new IllegalArgumentException("Plane with this name already exists");
            }
            if(requestDto.getDescription().length() > 254) {
                throw new IllegalArgumentException("Description is too long");
            }
            if(requestDto.getManufacturer() != null) {
                plane.setManufacturer(requestDto.getManufacturer());
            }
            if(requestDto.getName() != null ){
                plane.setName(requestDto.getName());
            }
            if(requestDto.getType() != null) {
                plane.setType(requestDto.getType());
            }
            if(requestDto.getYearOfManufacture() != 0) {
                plane.setYearOfManufacture(requestDto.getYearOfManufacture());
            }
            if(requestDto.getCountryOfOrigin() != null) {
                plane.setCountryOfOrigin(requestDto.getCountryOfOrigin());
            }
            if(requestDto.getDescription() != null) {
                plane.setDescription(requestDto.getDescription());
            }
            if(requestDto.getImageUrl() != null) {
                plane.setImageUrl(requestDto.getImageUrl());
            }
            planeRepo.save(plane);
        }catch (Exception e){
            throw new IllegalArgumentException("Plane not found");
        }
    }

    @Transactional
    public void deletePlane(String name) {
        try{
            Plane plane = planeRepo.findByName(name);
            planeRepo.delete(plane);
        }catch (Exception e){
            throw new IllegalArgumentException("Plane not found");
        }
    }

    public List<Plane> getAllPlanes() {
        return planeRepo.findAll();
    }

    public PlaneDTO getPlaneById(int id) {
            Plane plane = planeRepo.getPlaneById(id);
            if(plane == null) {
                throw new IllegalArgumentException("Plane not found");
            }
            return new PlaneDTO(
                    plane.getManufacturer(),
                    plane.getName(),
                    plane.getType(),
                    plane.getYearOfManufacture(),
                    plane.getCountryOfOrigin(),
                    plane.getDescription(),
                    plane.getImageUrl()
            );
    }
}
