
/**
 * Word counting exercises.
 * 
 * @author Min Lee
 * @version 06222022
 */
import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Queue;
import java.util.Scanner;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;

public class x {
	
	/**
	 * Returns the sequence of non letter or digits from the input String
	 * str.
	 * 
	 * @param str String that does not start with a letter or digit
	 * @precond str starts with 1 or more non-letter or digit characters
	 * @return the sequence of non-letter and digits that start str
	 */
	public static String getNextNonTokenSequence(String str) {
		String nontoken = ""; //create an empty string
		for(int i=0; i<str.length();i++) { //runs until the end of the str
			boolean check1 = Character.isDigit(str.charAt(i)); //check ith character is digit or not
			boolean check2 = Character.isLetter(str.charAt(i)); // check ith character is letter or not
			if (check1==true || check2==true){ // break if ith character is digit or letter
				break;
			}
			if(check1==false ||check2==false) { // add character to nontoken when the ith character is not digit or letter
				nontoken = nontoken+str.charAt(i);
			}
		}
		return nontoken;
	}
	
	/**
	 * Returns the sequence of letter or digits from the input String
	 * str.
	 * 
	 * @param str String that starts with a letter or digit
	 * @precond str starts with 1 or more letter or digit characters
	 * @return the sequence of letter and digits that start str
	 */
	public static String getNextTokenSequence(String str) {
		String tokenseq= ""; //create an empty string
		for(int i=0; i<str.length();i++) { //runs until the end of str
			boolean check1 = Character.isDigit(str.charAt(i)); //check ith character is digit or not
			boolean check2 = Character.isLetter(str.charAt(i));// check ith character is letter or not
			if (check1==true || check2==true){// add character to token when the ith character is  digit or letter
				tokenseq = tokenseq +str.charAt(i);
			}
			else if(check1==false || check2==false) {// break if ith character is not digit or not letter
				break;
			}
		}
		
		return tokenseq;
	}

	/**
	 * Returns a queue of words from the input String str
	 * 
	 * @param str string to split into words
	 * @return a queue of words from the string str
	 */
	public static Queue<String> splitWords(String str) {
		Queue<String> wordlist= new LinkedList<>(); //create an empty queue 
		int idx=0; // set index to first character of str
		String nontoken;
		String token;
		while (idx<str.length()) { //runs until idx is smaller than the length of str
			nontoken =  getNextNonTokenSequence(str.substring(idx)); //get the string of nontoken sequence from str starting from the beginning of str
			if(nontoken.length()>0) { //runs if nontoken is not empty
				idx = str.indexOf(nontoken, idx)+nontoken.length();// set index after the nonToken sequence
			}
			token= getNextTokenSequence(str.substring(idx)); //get the string of token sequence from str starting from the beginning
			if(token.length()>0) { //runs if token is not empty
				wordlist.add(token); //add token into the queue
				idx = str.indexOf(token, idx)+token.length(); //set index after the token sequence
			}
		}

		return wordlist;
	}

	/**
	 * Returns a set of words from the input file fname.
	 * 
	 * @param fname filename of words file to read
	 * @return a set of words from the input file.
	 */
	public static Set<String> getWordsInFile(String fname) throws FileNotFoundException {
		try {
			Set<String> wordsinfile = new HashSet<String>(); //create an empty set
			
			File file = new File (fname); // open the file to read
			
	
			Scanner scnr = new Scanner(file);
	
			
			String nxtline;

			while(scnr.hasNextLine()) {//runs until the end of the file
				nxtline=scnr.nextLine(); //read the file
				Queue<String> word = splitWords(nxtline); //split words of the file
				for(String s: word) {
				  wordsinfile.add(s); //add words to a set
			  }
			}
			
		    scnr.close(); //close a input file
			return wordsinfile;
		} catch(FileNotFoundException e) { //if file failed to open
			e.printStackTrace();
			return new HashSet<String>();
		}
		
	}
	
	/**
	 * Returns a map of word counts from the input file fname.
	 * 
	 * @param fname filename of words file to read
	 * @return a map of words and counts from the input file.
	 */
	public static Map<String, Integer> getWordCounts(String fname) throws FileNotFoundException {
		try {
		Map<String, Integer> frequencyword = new HashMap<>(); //create an empty map
		File file = new File(fname); //open the file to read
		Scanner scnr = new Scanner(file);
		
		String nxtline;
		while(scnr.hasNextLine()) { //runs until the end of the file
			nxtline=scnr.nextLine(); //read a line in the file
			Queue<String> word = splitWords(nxtline); //split words in the file
			for(String s:word) { //runs over the queue
				if(frequencyword.containsKey(s)) { //if s is found in the map, add the frequency of s in the map
					frequencyword.put(s,frequencyword.get(s)+1);
				}
				else { //s is not found in map, insert s with frequency 1
					frequencyword.put(s, 1);
				}
			}
			
		}
		scnr.close(); //close a input file
		return frequencyword;
		}
		catch(FileNotFoundException e) { //if the file failed to open
			e.printStackTrace();
			return new HashMap<String,Integer>();
			
		}
	}

	public static void main(String[] args) throws FileNotFoundException {
		String newStr = getNextNonTokenSequence("?  .-abc123");
		System.out.println("Non token sequence is: "+newStr);
		newStr = getNextTokenSequence("223abc  ?.");
		System.out.println("Token sequence is: "+newStr);
		Queue<String> q = splitWords("Over the river, and through the woods.  To grandmother's house.");
		System.out.println("Queue of words is: "+q);
	    //System.out.println(getWordsInFile("frankenstein.txt"));
		
		Scanner keyboard = new Scanner(System.in);
		System.out.print("Enter a filename: ");
		String fname = keyboard.nextLine();
		File file = new File(fname);
		Scanner input = new Scanner(file);
		System.out.print("Enter a last word: ");
		String laword = keyboard.nextLine();
		Map<String,Integer> word = getWordCounts(fname);
		PriorityQueue<String> pq = new PriorityQueue<String>();
		Set<Map.Entry<String, Integer>> entries = word.entrySet();
		for (Map.Entry<String, Integer> entry : entries) {
		    //System.out.println(entry.getKey()+":"+entry.getValue());
		    pq.add(entry.getKey());
		}
        
		System.out.println(pq);
        String w = "";
		while (!w.equals(laword) && w.compareTo(laword) < 0) {
            w = pq.poll();
            if (w.compareTo(laword) <= 0) {
                System.out.println(w + ": " + word.get(w));
            }
		}
	}

}
