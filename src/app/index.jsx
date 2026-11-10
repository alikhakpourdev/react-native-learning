import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STORAGE_KEY = '@learn_app_todos';

const filterLabels = {
  all: 'همه کارها',
  active: 'انجام‌نشده',
  done: 'انجام‌شده',
};

export default function TodoScreen() {
  const [inputme, setInputme] = useState('');
  // 2. Component state
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);

  // 3. Load saved todos when app starts
  useEffect(() => {
    let active = true;

    async function loadTodos() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);

        if (saved && active) {
          const parsed = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            setTodos(parsed);
          }
        }
      } catch (error) {
        console.warn('Could not load todos:', error);
      } finally {
        if (active) {
          setIsLoaded(true);
        }
      }
    }

    loadTodos();

    return () => {
      active = false;
    };
  }, []);

  // 4. Save todos whenever they change
  useEffect(() => {
    if (!isLoaded) return;

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos)).catch((error) => {
      console.warn('Could not save todos:', error);
    });
  }, [todos, isLoaded]);

  // 5. Add a new todo
  function addTodo() {
    const title = input.trim();

    if (!title) return;

    const newTodo = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      title,
      completed: false,
    };

    setTodos((current) => [newTodo, ...current]);
    setInput('');
  }

  // 6. Toggle todo completion
  function toggleTodo(id) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // 7. Delete a todo
  function deleteTodo(id) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  // 8. Calculate progress
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;

  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  // 9. Filter visible todos
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'done') return todo.completed;
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>✓</Text>
          </View>

          <View style={styles.headerContent}>
            <Text style={styles.subtitle}>برنامه‌ریزی روزانه</Text>
            <Text style={styles.title}>کارهای من</Text>
          </View>
        </View>

        {/* Progress card */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>{`امروز ${total} کار داری`}</Text>

          <Text style={styles.progressSubtitle}>
            {`${completed} کار انجام‌شده از ${total} کار`}
          </Text>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progress}%`,
                },
              ]}
            />
          </View>
        </View>

        {/* Add todo */}
        <View style={styles.formRow}>
          <Pressable
            style={styles.addButton}
            onPress={addTodo}
            accessibilityLabel="افزودن کار"
          >
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>

          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={addTodo}
            placeholder="کار جدید را بنویس..."
            placeholderTextColor="#9CA3AF"
            textAlign="right"
            returnKeyType="done"
          />
        </View>

        {/* Filters */}
        <View style={styles.filterRow}>
          {['all', 'active', 'done'].map((item) => (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              style={[styles.filterButton, filter === item && styles.activeFilter]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === item && styles.activeFilterText,
                ]}
              >
                {filterLabels[item]}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Todo list */}
        {!isLoaded ? (
          <ActivityIndicator size="large" color="#4F46E5" />
        ) : (
          <FlatList
            style={styles.list}
            data={visibleTodos}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                هنوز کاری در این بخش وجود ندارد.
              </Text>
            }
            renderItem={({ item }) => (
              <View style={styles.todoCard}>
                <Pressable
                  onPress={() => deleteTodo(item.id)}
                  style={styles.deleteButton}
                  accessibilityLabel={`حذف ${item.title}`}
                >
                  <Text style={styles.deleteText}>حذف</Text>
                </Pressable>

                <Pressable
                  onPress={() => toggleTodo(item.id)}
                  style={styles.todoContent}
                  accessibilityLabel={item.title}
                >
                  <Text
                    style={[styles.todoTitle, item.completed && styles.doneTitle]}
                  >
                    {item.title}
                  </Text>

                  <View
                    style={[
                      styles.checkbox,
                      item.completed && styles.checkedCheckbox,
                    ]}
                  >
                    {item.completed && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </Pressable>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContent: {
    alignItems: 'flex-end',
  },
  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#E9E8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconText: {
    color: '#4F46E5',
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#7A8194',
    fontSize: 12,
    textAlign: 'right',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#172033',
    textAlign: 'right',
  },
  progressCard: {
    backgroundColor: '#4F46E5',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  progressTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  progressSubtitle: {
    color: '#E0E7FF',
    fontSize: 13,
    marginTop: 7,
    marginBottom: 18,
    textAlign: 'right',
  },
  progressTrack: {
    height: 8,
    borderRadius: 10,
    backgroundColor: '#7771E9',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  formRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3E5ED',
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 52,
    fontSize: 14,
    color: '#172033',
    writingDirection: 'rtl',
  },
  addButton: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 30,
    color: '#FFFFFF',
    lineHeight: 34,
  },
  filterRow: {
    flexDirection: 'row-reverse',
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 11,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3E5ED',
  },
  activeFilter: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  filterText: {
    fontSize: 11,
    color: '#515B70',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 30,
    flexGrow: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 55,
    fontSize: 14,
  },
  todoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAECF2',
    borderRadius: 14,
    marginBottom: 10,
    minHeight: 65,
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
    marginLeft: 10,
  },
  todoTitle: {
    flexShrink: 1,
    color: '#253148',
    fontSize: 14,
    textAlign: 'right',
  },
  doneTitle: {
    color: '#A2A6B3',
    textDecorationLine: 'line-through',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CED3DF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  checkmark: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 7,
  },
  deleteText: {
    color: '#E36D72',
    fontSize: 12,
  },
});
