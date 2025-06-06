package org.example.planemuseumbackend.Controller;

import org.example.planemuseumbackend.Dto.PlaneDTO;
import org.example.planemuseumbackend.Service.PlaneService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/planes")
public class PlaneController {
    private final PlaneService planeService;
    private final Logger log = LoggerFactory.getLogger(PlaneController.class);
    // Constructor injection
    public PlaneController(PlaneService planeService) {
        this.planeService = planeService;
    }

    //CREATE
    @PostMapping("/create")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> createPlane(@RequestBody PlaneDTO requestDto) {
        try{
            planeService.createPlane(requestDto);
        }catch(IllegalArgumentException e) {
            log.error("Plane creation failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        log.info("Plane created");
        return ResponseEntity.status(HttpStatus.CREATED).body("Plane created successfully");
    }

    //READ
    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> getAllPlanes() {
        log.info("Get all planes");
        return ResponseEntity.status(HttpStatus.OK).body(planeService.getAllPlanes());
    }

    @GetMapping("/manage/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> getPlaneById(@PathVariable int id) {
        try {
                return ResponseEntity.status(HttpStatus.OK).body(planeService.getPlaneById(id));
        } catch (IllegalArgumentException e) {
            log.error("Plane retrieval failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    //UPDATE
    @PutMapping("/manage/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> updatePlane(@PathVariable int id, @RequestBody PlaneDTO requestDto) {
        try{
            planeService.updatePlane(id, requestDto);
        }catch(IllegalArgumentException e) {
            log.error("Plane update failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        log.info("Plane updated");
        return ResponseEntity.status(HttpStatus.OK).body("Plane updated successfully");
    }

    //DELETE
    @DeleteMapping("/manage/{name}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> deletePlane(@PathVariable String name) {
        try {
            planeService.deletePlane(name);
        }catch(IllegalArgumentException e) {
            log.error("Plane deletion failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        log.info("Plane deleted");
        return ResponseEntity.status(HttpStatus.OK).body("Plane deleted successfully");
    }

}
