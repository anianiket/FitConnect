package com.stackroute.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.stackroute.exception.UserAlreadyExistsException;
import com.stackroute.model.UserDTO;
import com.stackroute.model.UserService;
import com.stackroute.repository.UserServiceRepository;

@Service
public class UserServiceServiceImpl implements UserServiceService {

	@Autowired
	private UserServiceRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private Cloudinary cloudinary;

	@Override
	public UserDTO registerUser(UserService user) {
		// TODO Auto-generated method stub
		Optional<UserService> exsistingUser = userRepository.findById(user.getUserEmail());
		if (exsistingUser.isPresent()) {
			throw new UserAlreadyExistsException("User with same email already exsists" + user.getUserEmail());
		}

		if (user.getUserEmail() == null || user.getUserPasswordHash() == null) {
			return null;
		} else {
			String plainPassowrd = user.getUserPasswordHash();
			String hashedPassword = passwordEncoder.encode(plainPassowrd);
			user.setUserPasswordHash(hashedPassword);

			UserService createdUser = userRepository.save(user);
			UserDTO userDto = new UserDTO();
			userDto.addUser(createdUser);
			return userDto;
		}

	}

	@Override
	public UserDTO updateUser(UserService user, String userEmail) {
		UserService exsistingUser = userRepository.findById(userEmail).orElse(null);

		if (exsistingUser != null) {
			exsistingUser.setUserName(user.getUserName());
			exsistingUser.setUserAge(user.getUserAge());
			exsistingUser.setUserMobile(user.getUserMobile());
			exsistingUser.setHeight(user.getHeight());
			exsistingUser.setWeight(user.getWeight());
			UserService updatedUser = userRepository.save(exsistingUser);
			UserDTO userDto = new UserDTO();
			userDto.addUser(updatedUser);
			return userDto;
		} else {
			return null;
		}

	}

	@Override
	public UserDTO getUserByEmail(String email) {
		Optional<UserService> optional = userRepository.findById(email);
		if(optional.isPresent()) {
			UserDTO userDto = new UserDTO();
			userDto.addUser(optional.get());
			return userDto;
		}
		return null;
	}

	@Override
	public String uploadProfilepic(String userEmail, MultipartFile file) {
		// TODO Auto-generated method stub
		try {
			Map<String, String> uploadPic = cloudinary.uploader().upload(file.getBytes(), Map.of());

			String url = uploadPic.get("url");

			UserService uploadedImage = userRepository.findById(userEmail).orElse(null);

			if (uploadedImage != null) {
				uploadedImage.setUserProfilePicUrl(url);
				userRepository.save(uploadedImage);
			} else {
				return null;
			}

			return url;
		} catch (IOException e) {
			throw new RuntimeException("Image updloading failed", e);

		}

	}

	@Override
	public UserDTO updatePlan(UserService user, String userEmail) {
		// TODO Auto-generated method stub
		UserService exsistingUser = userRepository.findById(userEmail).orElse(null);

		if (exsistingUser != null) {
			exsistingUser.setPlanName(user.getPlanName());
			exsistingUser.setPlanPrice(user.getPlanPrice());
			exsistingUser.setPlanDuration(user.getPlanDuration());
			exsistingUser.setExpirationDate(user.getExpirationDate());
			UserService updatedPlan = userRepository.save(exsistingUser);
			UserDTO updatedDTO = new UserDTO();
			updatedDTO.addUser(updatedPlan);
			return updatedDTO;
		} else {
			return null;
		}

	}

	@Override
	public List<UserDTO> getAllUsers() {
		List<UserService> userList = userRepository.findAll();
		List<UserDTO> userDTOList = new ArrayList<>();

		for (UserService userService : userList) {
			UserDTO userDTO = new UserDTO();
			userDTO.addUser(userService);
			userDTOList.add(userDTO);
		}

		return userDTOList;
	}

}
