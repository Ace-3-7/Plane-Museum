package org.example.planemuseumbackend.Service;


import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.planemuseumbackend.Dto.GetUserDTO;
import org.example.planemuseumbackend.Dto.LoginUserDTO;
import org.example.planemuseumbackend.Dto.RegisterUserDTO;
import org.example.planemuseumbackend.Entities.Users;
import org.example.planemuseumbackend.Repo.UsersRepo;
import org.hibernate.dialect.sequence.HANASequenceSupport;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class UserService {
    private final UsersRepo usersRepo;

    @Transactional
    public void registerUser(RegisterUserDTO registerUserDTO) {
        if(Objects.equals(registerUserDTO.getName(), "") || Objects.equals(registerUserDTO.getEmail(), "") || Objects.equals(registerUserDTO.getPassword(), "")
                || registerUserDTO.getName() == null || registerUserDTO.getEmail() == null || registerUserDTO.getPassword() == null) {
            throw new IllegalArgumentException("Name, email, and password cannot be null");
        }
        if(usersRepo.existsByEmail(registerUserDTO.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        Users user = new Users();
        user.setName(registerUserDTO.getName());
        user.setEmail(registerUserDTO.getEmail());
        String hashPassword = String.valueOf(registerUserDTO.getPassword().hashCode());
        user.setPassword(hashPassword);
        user.setIsAdmin(Objects.equals(registerUserDTO.getAdminPassword(), "1234"));
        usersRepo.save(user);
    }

    @Transactional
    public void updateUser(RegisterUserDTO requestDto) {

        Users user = usersRepo.findByEmail(requestDto.getEmail());
        if(user == null) {
            throw new IllegalArgumentException("User not found");
        }
        if(requestDto.getName() != null) {
            user.setName(requestDto.getName());
        }
        if(requestDto.getPassword() != null) {
            String hashPassword = String.valueOf(requestDto.getPassword().hashCode());
            user.setPassword(hashPassword);
        }
        usersRepo.save(user);

    }

    @Transactional
    public void deleteUser(String email) {
        Users user = usersRepo.findByEmail(email);
        if(user == null) {
            throw new IllegalArgumentException("User not found");
        }
        usersRepo.delete(user);
    }

    public boolean authenticateUser(LoginUserDTO requestDto) {
        Users user = usersRepo.findByEmail(requestDto.getEmail());
        if(user == null) {
            return false; // User not found
        }
        String hashPasswordRequest = String.valueOf(requestDto.getPassword().hashCode());
        String hashPasswordDB = user.getPassword();
        return hashPasswordDB.equals(hashPasswordRequest); // Check password
    }

    public List<GetUserDTO> getAllUsers() {
        List<Users> users = usersRepo.findAll();
        return users.stream().map(user -> {
            GetUserDTO userDto = new GetUserDTO();
            userDto.setName(user.getName());
            userDto.setEmail(user.getEmail());
            userDto.setIsAdmin(user.getIsAdmin());
            return userDto;
        }).toList();
    }

    public boolean isAdmin(String email) {
        Users user = usersRepo.findByEmail(email);
        if(user == null) {
            return false; // User not found
        }
        return user.getIsAdmin(); // Check if user is admin
    }

    public String getManageUsers(String email) {
        Users user = usersRepo.findByEmail(email);
        if(user == null) {
            throw new IllegalArgumentException("User not found");
        }
        return user.getName();
    }
}
