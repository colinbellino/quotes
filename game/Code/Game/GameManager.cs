using System.Collections.Generic;
using UnityEditor;
using UnityEngine;
using Random = UnityEngine.Random;

public class GameManager : MonoBehaviour
{
	[SerializeField] public PersonComponent _personPrefab;

	private Dictionary<string, Person> _persons;

	private void Start()
	{
		_persons = new Dictionary<string, Person>();
		_persons.Add("Person1", new Person {Id = "Person1", Sprite = Resources.Load<Sprite>("Sprites/Person1")});
		_persons.Add("Person2", new Person {Id = "Person2", Sprite = Resources.Load<Sprite>("Sprites/Person2")});

		var person1 = SpawnPerson("Person1", new Vector3(12f, 0f, 15f));
		var person2 = SpawnPerson("Person2", new Vector3(21f, 0f, 11f));
	}

	private PersonComponent SpawnPerson(string id, Vector3 position)
	{
		var person = Instantiate(_personPrefab, position, Quaternion.identity);
		person.Init(_persons[id]);
		return person;
	}

	public void CreateRandomQuote()
	{
		var quote1 = new Quote { Author = "Person1", Message = "Hello world!" };
		var quote2 = new Quote { Author = "Person2", Message = "Annyong!" };
		GameEvents.QuoteAdded?.Invoke(Random.Range(0f, 1f) > 0.5f ? quote1 : quote2);
	}

	// [CustomEditor(typeof(GameManager))]
	// public class GameManagerEditor : Editor
	// {
	// 	public override void OnInspectorGUI()
	// 	{
	// 		base.OnInspectorGUI();
	//
	// 		if (Application.isPlaying)
	// 		{
	// 			if (GUILayout.Button("New Quote"))
	// 			{
	// 				var quote1 = new Quote { Author = "Person1", Message = "Hello world!" };
	// 				var quote2 = new Quote { Author = "Person2", Message = "Annyong!" };
	// 				GameEvents.QuoteAdded?.Invoke(Random.Range(0f, 1f) > 0.5f ? quote1 : quote2);
	// 			}
	// 		}
	// 	}
	// }
}
